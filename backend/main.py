from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin
import bcrypt
import os


app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
#NOTE: Look at the docker compose file for the database connection string. if you are on windows, and can't connect, change 0.0.0.0 to localhost
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@0.0.0.0:5555/mydatabase'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)


def generate_password_hash(password):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed

def check_password_hash(hashed_password, password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)



class User(db.Model, UserMixin):
    id = db.Column(db.String(120), primary_key=True, default=db.func.uuid())
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)




@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    #Build the frontend
    os.system('cd ../frontend && npm install && npm run build')
    # Initialize the database
    with app.app_context():
        db.create_all()

    app.run(port=5000, debug=True)


