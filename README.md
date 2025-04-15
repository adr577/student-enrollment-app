# student-enrollment-app
student enrolllment app for Lab 8 in CSE 108

# Backend API
```python
class Class(db.Model):
    __tablename__ = 'class'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True)
    name = db.Column(db.String(80), nullable=False)
    time = db.Column(db.String(80), nullable=False)
    students_enrolled = db.Column(db.Integer, nullable=False, default=0)
    max_students = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Class {self.name}>'
    





class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True)
    username = db.Column(db.Text, unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(80), nullable=False)
    # Define the relationship to the Class model
    

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

enrollment_table = db.Table('enrollment',
    db.Column('student_id', UUID(as_uuid=True), db.ForeignKey('users.id'), primary_key=True),
    db.Column('class_id',UUID(as_uuid=True), db.ForeignKey('class.id'), primary_key=True),
    db.Column('grade', db.String(80), nullable=True),
    db.Index('idx_student_id', 'student_id'),
    db.Index('idx_class_id', 'class_id'),
)

teaching_table = db.Table('teaching',
    db.Column('teacher_id', UUID(as_uuid=True), db.ForeignKey('users.id'), primary_key=True),
    db.Column('class_id',UUID(as_uuid=True), db.ForeignKey('class.id'), primary_key=True),
    db.Index('idx_teacher_id', 'teacher_id'),
    db.Index('idx_teacher_class_id', 'class_id')
)
```
## API Endpoints
### 1. Register
- **URL**: `/api/register`
- **Method**: `POST`
- **Request Body**:
```json
{
    "username": "string",
    "password": "string",
    "role": "string", ["student"]
}
```
- **Response**:
```json
{
    "success": "boolean",
    "message": "User registered successfully"
}
```

### 2. Login
- **URL**: `/api/login`
- **Method**: `POST`
- **Request Body**:
```json
{
    "username": "string",
    "password": "string"
}
```

### 3. Logout
- **URL**: `/api/logout`
- **Method**: `POST`
- **Response**:
```json
{
    "success": "boolean",
    "message": "User logged out successfully"
}
```

### 4. Get All Classes
- **URL**: `/api/get-classes`
- **Method**: `GET`
- **Response**:
```json
{
    "classes": [
        {
            "id": "string",
            "name": "string",
            "teacher": "string",
            "time": "string",
            "students_enrolled" : "number",
            "max_students" : "number",
        }
    ]
}
```
### 5. Get users Classes (teacher or student)
- **URL**: `/api/get-classes`
- **Method**: `GET`
- **Response**:
```json
{
    "classes": [
        {
            "id": "string",
            "name": "string",
            "teacher": "string",
            "time": "string",
            "students_enrolled" : "number",
            "max_students" : "number",
            "grade" : "number" {if student, else null},
        }
    ]
}
```

### 6. Enroll in Class
- **URL**: `/api/enroll/{class_id}`
- **Method**: `POST`
- **Response**:
```json
{
    "success": "boolean",
    "message": "User enrolled successfully"
}
```

### 7. Drop Class
- **URL**: `/api/unenroll/{class_id}`
- **Method**: `POST`
- **Response**:
```json
{
    "success": "boolean",
    "message": "User unenrolled successfully"
}
```


### 8. Get Enrolled Students
- **URL**: `/api/get-enrolled-students/{class_id}`
- **Method**: `GET`
- **Response**:
```json
{
    "students": [
        {
            "id": "string",
            "name": "string",
            "grade": "number" {if teacher, else null},
        }
    ]
}
```

### 9. Update Grade (Teachers Only, Admin Only)
- **URL**: `/api/update-grade/{class_id}/{student_id}`
- **Method**: `POST`
- **Request Body**:
```json
{
    "grade": "number"
}
```
- **Response**:
```json
{
    "success": "boolean",
    "message": "Grade updated successfully"
}
```

### 10. Create Users (Admin Only, Can Creat Many Users) 
- **URL**: `/api/create-users`
- **Method**: `POST`
- **Request Body**:
```json
{
    "users": [
        {
            "username": "string",
            "password": "string",
            "role": "string", ["student"]
        }
    ]
}
```
- **Response**:
```json
{
    "success": "boolean",
    "message": "Users created successfully"
}
```

### 11. Create Classes (Admin Only, Can Create Many Classes)
- **URL**: `/api/create-classes`
- **Method**: `POST`
- **Request Body**:
```json
{
    "classes": [
        {
            "name": "string",
            "time": "string",
            "max_students" : "number",
        }
    ]
}
```

- **Response**:
```json
{
    "success": "boolean",
    "message": "Classes created successfully"
}
```


### 12.  Assign Teacher to Class (Admin Only)
- **URL**: `/api/assign-teacher/{teacher_id}/{class_id}`
- **Method**: `POST`
- **Response**:
```json
{
    "success": "boolean",
    "message": "Teacher assigned successfully"
}
```

### 13. Remove Teacher from Class (Admin Only)
- **URL**: `/api/remove-teacher/{teacher_id}/{class_id}`
- **Method**: `POST`
- **Response**:
```json
{
    "success": "boolean",
    "message": "Teacher removed successfully"
}
```

### 14. Get Users (Admin Only)
- **URL**: `/api/get-users/{role}`
- **Method**: `GET`
- **Response**:
```json
{
    "users": [
        {
            "id": "string",
            "username": "string",
            "role": "string"
        }
    ]
}
```


### 15. Delete User (Admin Only)
- **URL**: `/api/delete-user/{user_id}`
- **Method**: `DELETE`
- **Response**:
```json
{
    "success": "boolean",
    "message": "User deleted successfully"
}
```
