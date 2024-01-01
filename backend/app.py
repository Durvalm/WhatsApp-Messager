from flask import Flask, url_for
from settings import db_session, init_db, Base
from models import User
from flask_migrate import Migrate

app = Flask(__name__)

init_db()

migrate = Migrate(app, Base)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@app.route("/")
def hello_world():
    user = User.query.filter(User.name == "Durval").first()

    # Accessing the user from the chat
    # return "<h1>Hello World</h1>"
    return f"<img src={url_for('static', filename=f'img/{user.picture_filename}')} />"