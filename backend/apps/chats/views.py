from flask import Blueprint
from apps.models import Chat

chats_bp = Blueprint("chats", __name__, url_prefix="/chats")

@chats_bp.route("/get", methods=["GET"])
def get_chats():
    chats = Chat.query.all()
    return chats