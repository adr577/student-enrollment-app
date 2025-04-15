from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from flask_cors import CORS
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import text

import uuid
import bcrypt
import os


app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
#NOTE: Look at the docker compose file for the database connection string. if you are on windows, and can't connect, change 0.0.0.0 to localhost
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@0.0.0.0:5555/mydatabase'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
app.config['LOGIN_DISABLED'] = False
# Set a secret key for session management
app.config['SECRET_KEY'] = os.urandom(24)


def generate_password_hash(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def check_password_hash(hashed_password, password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))





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


def initData():
    teachers = {
        User(username='teacher1', password_hash=generate_password_hash('password1'), role='teacher'),
        User(username='teacher2', password_hash=generate_password_hash('password2'), role='teacher'),
        User(username='teacher3', password_hash=generate_password_hash('password3'), role='teacher'),
    }
    db.session.bulk_save_objects(teachers)
    db.session.commit()

    students = {
        User(username='student1', password_hash=generate_password_hash('password1'), role='student'),
        User(username='student2', password_hash=generate_password_hash('password2'), role='student'),
        User(username='student3', password_hash=generate_password_hash('password3'), role='student'),
    }
    # Add the users to the database
    db.session.bulk_save_objects(students)
    db.session.commit()
    classes = [
        Class(name='Math 101',  time='MWF 9:00-10:00', students_enrolled=0, max_students=30),
        Class(name='History 101',  time='TTh 10:00-11:30', students_enrolled=0, max_students=25),
        Class(name='Science 101',  time='MWF 11:00-12:00', students_enrolled=0, max_students=20),
    ]


    db.session.bulk_save_objects(classes)
    db.session.commit()
    
    teachers = db.session.query(User).filter_by(role='teacher').all()
    students = db.session.query(User).filter_by(role='student').all()
    classes = db.session.query(Class).all()

    # Assign teachers to classes
    db.session.execute(teaching_table.insert().values(teacher_id=teachers[0].id, class_id=classes[0].id))
    db.session.execute(teaching_table.insert().values(teacher_id=teachers[1].id, class_id=classes[1].id))
    db.session.execute(teaching_table.insert().values(teacher_id=teachers[2].id, class_id=classes[2].id))
    db.session.commit()




DBUG = True






@app.route('/test')
def test():
    return "Flask server is working!"

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')

    if not username or not password:
        return jsonify({'success': False, 'message': 'Username and password are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'success': False, 'message': 'Username already exists'}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    new_user.role = role
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'success': True, 'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
    



        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            login_user(user)
            return jsonify({'success': True, 'message': 'Login successful', 'role': user.role}), 200
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401



@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'success': True,'message': 'Logged out successfully'}), 200

@app.route('/api/get-classes', methods=['GET'])
@login_required
def get_all_classes():
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    classes = db.session.query(Class).all()
    if not classes:
        return jsonify({'success': False, 'message': 'No classes found'}), 404
    class_list = []
    for cls in classes:

        teacher = db.session.query(User).join(teaching_table).filter(teaching_table.c.class_id == cls.id).first()

        class_list.append({
            'id': str(cls.id),
            'name': cls.name,
            'teacher': teacher.username if teacher else None,
            'time': cls.time,
            'students_enrolled': cls.students_enrolled,
            'max_students': cls.max_students
        })
    return jsonify({'success': True, 'classes': class_list}), 200


@app.route('/api/get-classes/', methods=['GET'])
@login_required
def get_classes():
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401


    if current_user.role != 'student' and current_user.role != 'teacher':
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403

    user_role = current_user.role

    if user_role == 'student':
        classes = db.session.query(Class).join(enrollment_table).filter(enrollment_table.c.student_id == current_user.id).all()
    elif user_role == 'teacher':
        classes = db.session.query(Class).join(teaching_table).filter(teaching_table.c.teacher_id == current_user.id).all()
        


    class_list = []
    for cls in classes:
        if current_user.role == 'student':
            enrollment = db.session.query(enrollment_table).filter_by(student_id=current_user.id, class_id=cls.id).first()
            grade = enrollment.grade if enrollment else None

        teacher = db.session.query(User).join(teaching_table).filter(teaching_table.c.class_id == cls.id).first()
        if not teacher:
            print('No teacher found for class:', cls.id)
        class_list.append({
            'id': str(cls.id),
            'name': cls.name,
            'teacher': teacher.username if teacher else None,
            'time': cls.time,
            'students_enrolled': cls.students_enrolled,
            'max_students': cls.max_students,
            'grade': grade if current_user.role == 'student' else None
        })

    return jsonify({'success': True, 'classes': class_list}), 200

@app.route('/api/enroll/<class_id>', methods=['POST'])
@login_required
def enroll(class_id):
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    if current_user.role != 'student':
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403
    class_to_enroll = Class.query.get(class_id)
    if not class_to_enroll:
        return jsonify({'success': False, 'message': 'Class not found'}), 404

    if class_to_enroll.students_enrolled >= class_to_enroll.max_students:
        return jsonify({'success': False, 'message': 'Class is full'}), 400
    # Check if the user is already enrolled in the class
    if db.session.query(enrollment_table).filter_by(student_id=current_user.id, class_id=class_id).first():
        return jsonify({'success': False, 'message': 'Already enrolled in this class'}), 400
    # Enroll the user in the class
    enrollment = enrollment_table.insert().values(student_id=current_user.id, class_id=class_id)
    db.session.execute(enrollment)
    class_to_enroll.students_enrolled += 1
    db.session.commit()
    return jsonify({'success': True, 'message': 'Enrolled in class successfully'}), 200

@app.route('/api/unenroll/<class_id>', methods=['POST'])
@login_required
def unenroll(class_id):
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    if current_user.role != 'student':
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403
    class_to_unenroll = Class.query.get(class_id)
    if not class_to_unenroll:
        return jsonify({'success': False, 'message': 'Class not found'}), 404
    # Check if the user is enrolled in the class
    if not db.session.query(enrollment_table).filter_by(student_id=current_user.id, class_id=class_id).first():
        return jsonify({'success': False, 'message': 'Not enrolled in this class'}), 400
    # Unenroll the user from the class
    db.session.query(enrollment_table).filter_by(student_id=current_user.id, class_id=class_id).delete()
    class_to_unenroll.students_enrolled -= 1
    db.session.commit()
    return jsonify({'success': True, 'message': 'Unenrolled from class successfully'}), 200

@app.route('/api/get-enrolled-students/<class_id>', methods=['GET'])
@login_required
def getEnrolledStudents(class_id):
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    if current_user.role not in ['teacher', 'admin', 'student']:
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403
    class_to_get_students = Class.query.get(class_id)
    if not class_to_get_students:
        return jsonify({'success': False, 'message': 'Class not found'}), 404
    # Check if the user is teaching the class
    if not db.session.query(teaching_table).filter_by(teacher_id=current_user.id, class_id=class_id).first():
        return jsonify({'success': False, 'message': 'Not teaching this class'}), 400
    # Get the list of enrolled students
    enrolled_students = db.session.query(User).join(enrollment_table).filter(enrollment_table.c.class_id == class_id).all()
    student_list = []
    for student in enrolled_students:
        student_list.append({
            'id': str(student.id),
            'username': student.username,
            'grade': student.grade if student.role == 'teacher' else None  })
    return jsonify({'success': True, 'students': student_list}), 200

@app.route('/api/update-grade/<class_id>/<student_id>', methods=['POST'])
@login_required
def updateGrade(class_id, student_id):
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    if current_user.role != 'teacher':
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403
    data = request.get_json()
    grade = data.get('grade')
    class_to_update = Class.query.get(class_id)
    if not class_to_update:
        return jsonify({'success': False, 'message': 'Class not found'}), 404
    # Check if the user is teaching the class
    if not db.session.query(teaching_table).filter_by(teacher_id=current_user.id, class_id=class_id).first():
        return jsonify({'success': False, 'message': 'Not teaching this class'}), 400
    # Check if the student is enrolled in the class
    if not db.session.query(enrollment_table).filter_by(student_id=student_id, class_id=class_id).first():
        return jsonify({'success': False, 'message': 'Student not enrolled in this class'}), 400
    # Update the grade
    db.session.query(enrollment_table).filter_by(student_id=student_id, class_id=class_id).update({'grade': grade})
    db.session.commit()
    return jsonify({'success': True, 'message': 'Grade updated successfully'}), 200
##Admin only routes
@app.route('/api/create-users', methods=['POST'])
@login_required
def createUsers():
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    if current_user.role != 'admin':
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403
    data = request.get_json()
    users = data.get('users')

    new_users = []
    for user in users:
        username = users.get('username')
        password = users.get('password')
        role = users.get('role')

        if not username or not password:
            return jsonify({'success': False, 'message': 'Username and password are required'}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({'success': False, 'message': 'Username already exists'}), 400

        new_user = User(username=username)
        new_user.set_password(password)
        new_user.role = role
        new_users.append(new_user)
    # Add the users to the database
    db.session.bulk_save_objects(new_users)
    db.session.commit()

    return jsonify({'success': True, 'message': 'User created successfully'}), 201

@app.route('/api/create-classes', methods=['POST'])
def createClasses():
    data = request.get_json()
    classes = data.get('classes')
    new_classes = []

    for cls in classes:
        name = cls.get('name')
        time = cls.get('time')
        max_students = cls.get('max_students')

        if not name or not time or not max_students:
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400

        new_class = Class(name=name, time=time, max_students=max_students)
        new_classes.append(new_class)

    db.session.bulk_save_objects(new_classes)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Classes created successfully'}), 201


@app.route('/api/assign-teacher/<teacher_id>/<class_id>', methods=['POST'])
@login_required
def assignTeacher(teacher_id, class_id):
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    if current_user.role != 'admin':
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403
    teacher = User.query.get(teacher_id)
    class_to_assign = Class.query.get(class_id)
    if not teacher:
        return jsonify({'success': False, 'message': 'Teacher not found'}), 404
    if not class_to_assign:
        return jsonify({'success': False, 'message': 'Class not found'}), 404
    # Check if the teacher is already assigned to the class
    if db.session.query(teaching_table).filter_by(teacher_id=teacher_id, class_id=class_id).first():
        return jsonify({'success': False, 'message': 'Teacher already assigned to this class'}), 400
    # Assign the teacher to the class
    assignment = teaching_table.insert().values(teacher_id=teacher_id, class_id=class_id)
    db.session.execute(assignment)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Teacher assigned to class successfully'}), 200

@app.route('/api/remove-teacher/<teacher_id>/<class_id>', methods=['POST'])
@login_required
def removeTeacher(teacher_id, class_id):
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    if current_user.role != 'admin':
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403
    teacher = User.query.get(teacher_id)
    class_to_remove = Class.query.get(class_id)
    if not teacher:
        return jsonify({'success': False, 'message': 'Teacher not found'}), 404
    if not class_to_remove:
        return jsonify({'success': False, 'message': 'Class not found'}), 404
    # Check if the teacher is assigned to the class
    if not db.session.query(teaching_table).filter_by(teacher_id=teacher_id, class_id=class_id).first():
        return jsonify({'success': False, 'message': 'Teacher not assigned to this class'}), 400
    # Remove the teacher from the class
    db.session.query(teaching_table).filter_by(teacher_id=teacher_id, class_id=class_id).delete()
    db.session.commit()
    return jsonify({'success': True, 'message': 'Teacher removed from class successfully'}), 200

@app.route('/api/get-users/<role>', methods=['GET'])
@login_required
def getUsers(role):
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    if current_user.role != 'admin':
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403

    if role not in ['student', 'teacher']:
        users = db.session.query(User).all()
        user_list = []
        for user in users:
            user_list.append({
                'id': str(user.id),
                'username': user.username,
                'role': user.role
            })
        return jsonify({'success': False, 'users': user_list}), 400


    users = db.session.query(User).filter_by(role=role).all()
    user_list = []
    for user in users:
        user_list.append({
            'id': str(user.id),
            'username': user.username,
            'role': user.role
        })
    return jsonify({'success': True, 'users': user_list}), 200

@app.route('/api/delete-user/<user_id>', methods=['DELETE'])
@login_required
def deleteUser(user_id):
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    if current_user.role != 'admin':
        return jsonify({'success': False, 'message': 'User role not recognized'}), 403
    user_to_delete = User.query.get(user_id)
    if not user_to_delete:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    # Delete the user
    db.session.delete(user_to_delete)
    db.session.commit()
    return jsonify({'success': True, 'message': 'User deleted successfully'}), 200

@app.route('/api/get-user/<user_id>', methods=['GET'])
@login_required
def getUser(user_id):
    if not current_user.is_authenticated:
        return jsonify({'success': False, 'message': 'User not authenticated'}), 401
    user = db.session.query(User).filter_by(id=user_id).first()
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404
    return jsonify({'success': True, 'user': {
        'id': str(user.id),
        'username': user.username,
        'role': user.role
    }}), 200


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    #Build the frontend
    if not DBUG:
        os.system('cd ../frontend && npm install && npm run build')
    # Initialize the database
    with app.app_context():
        db.create_all()
        # Check if the classes table is empty
        if db.session.query(Class).count() == 0:
            initData()
    

    app.run(port=5000, debug=True)
