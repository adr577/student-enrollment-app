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
    return hashed

def check_password_hash(hashed_password, password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)



class User(db.Model, UserMixin):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True)
    username = db.Column(db.Text, unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)




@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'success': False, 'message': 'Username and password are required'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'success': False, 'message': 'Username already exists'}), 400

    new_user = User(username=username)
    new_user.set_password(password)
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
            return jsonify({'success': True, 'message': 'Login successful'}), 200
        return jsonify({'success': False, 'message': 'Invalid username or password'}), 401



@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'success': True,'message': 'Logged out successfully'}), 200


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    #Build the frontend
    os.system('cd ../frontend && npm install && npm run build')
    # Initialize the database
    with app.app_context():
        db.create_all()

    app.run(port=5000, debug=True)


