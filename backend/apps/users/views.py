from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user
from apps.models import User
from apps.settings import db_session

users_bp = Blueprint("users", __name__, url_prefix="/users")

@users_bp.route("/get_users", methods=["GET"])
def get_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'name': user.name, 'picture_filename': user.picture_filename} for user in users]
    return jsonify(users=user_list)

@users_bp.route("/get/<int:user_id>", methods=["GET"])
def get(user_id):
    user = User.query.filter(User.id == user_id).first()
    user_dict = user.to_dict()
    return jsonify(user=user_dict)


@users_bp.route("/register", methods=["POST", "GET"])
def register():
    user = User(email="test@example.com", password="oi", name="Fla", picture_filename="IMG_8314.jpg")
    db_session.add(user)
    db_session.commit()
    # return jsonify()

@users_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user = User.query.filter_by(
            username=request.form.get("username")).first()
        if user.password == request.form.get("password"):
            login_user(user)
            # return redirect(url_for("home"))
    # return render_template("login.html")
 
 
@users_bp.route("/logout")
def logout():
    logout_user()
    # return redirect(url_for("home"))