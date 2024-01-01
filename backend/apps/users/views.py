from flask import Blueprint, jsonify
from apps.models import User

users_bp = Blueprint("users", __name__, url_prefix="/users")

@users_bp.route("/get", methods=["GET"])
def get_users():
    users = User.query.all()
    user_list = [{'id': user.id, 'name': user.name, 'picture_filename': user.picture_filename} for user in users]
    return jsonify(users=user_list)
