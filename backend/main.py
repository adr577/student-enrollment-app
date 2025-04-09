from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__, static_folder='../frontend/dist', static_url_path='/')
#NOTE: Look at the docker compose file for the database connection string. if you are on windows, and can't connect, change 0.0.0.0 to localhost
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@0.0.0.0:5432/mydatabase'
db = SQLAlchemy(app)





@app.route('/')
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(port=5000)


