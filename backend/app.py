from flask import Flask
from settings import db_session, init_db
from models import User

app = Flask(__name__)

init_db()

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@app.route("/")
def hello_world():
    print(User.query.all())
    return "<p>Hello World</p>"