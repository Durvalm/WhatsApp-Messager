from flask import Flask
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS

from apps.settings import db_session, init_db, Base, SECRET_KEY
from apps.models import User
from apps.blueprints import blueprints

app = Flask(__name__)
app.secret_key = SECRET_KEY
CORS(app)

init_db()
migrate = Migrate(app, Base)

login_manager = LoginManager()
login_manager.init_app(app)

for bp in blueprints:
    app.register_blueprint(bp)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@login_manager.user_loader
def loader_user(user_id):
    return User.query.get(user_id)

@app.route("/")
def hello_world():
    # user = User.query.filter(User.name == "Durval").first()

    return "<h1>Hello World</h1>"
    # return f"<img src={url_for('static', filename=f'img/{user.picture_filename}')} />"