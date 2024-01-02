from flask import Blueprint, jsonify, request
from flask_login import login_user, logout_user
from apps.models import User
from apps.settings import db_session

users_bp = Blueprint("users", __name__, url_prefix="/users")

@users_bp.route("/get_users", methods=["GET"])
def get_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'name': user.name, 'picture_filename': user.picture_filename} for user in users]
    response = jsonify(users=user_list)
    return response

@users_bp.route("/get/<int:user_id>", methods=["GET"])
def get(user_id):
    user = User.query.filter(User.id == user_id).first()
    user_dict = user.to_dict()
    return jsonify(user=user_dict)


@users_bp.route("/register", methods=["POST", "GET"])
def register():
    data = request.form
    
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    file = request.files.get('file')
    
    try:
        user = User.query.filter(User.email == email).first()
        user = User(name=name, email=email, password=password, picture_filename=file.filename)  
        db_session.add(user)
        db_session.commit()

        # Save file in static folder
        if file:
            file.save('static/img/' + file.filename)

        return jsonify({"message": "User registered successfully"}), 201
    except:
        return jsonify({"message": "User already exists"}), 500


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