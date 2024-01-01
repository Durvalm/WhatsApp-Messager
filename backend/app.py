from flask import Flask
from apps.settings import db_session, init_db, Base
from flask_migrate import Migrate
from apps.blueprints import blueprints

app = Flask(__name__)

init_db()

migrate = Migrate(app, Base)

for bp in blueprints:
    app.register_blueprint(bp)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@app.route("/")
def hello_world():
    # user = User.query.filter(User.name == "Durval").first()

    return "<h1>Hello World</h1>"
    # return f"<img src={url_for('static', filename=f'img/{user.picture_filename}')} />"