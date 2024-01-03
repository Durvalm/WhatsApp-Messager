from flask import Blueprint, jsonify
from sqlalchemy import or_
from ..models import User, Message
from ..settings import db_session

chats_bp = Blueprint("chats", __name__, url_prefix="/chats")

@chats_bp.route("/get_all/<int:user_id>", methods=["GET"])
def get_chats_for_user(user_id):
    # Return all chats that current user has had messages
    chats_query = db_session.query(Message.sender_id, Message.receiver_id).filter(
        or_(Message.sender_id == user_id, Message.receiver_id == user_id)).distinct()
    
    # Extract user IDs from query
    user_ids = set()
    for sender, receiver in chats_query:
        if sender != user_id:
            user_ids.add(sender)
        if receiver != user_id:
            user_ids.add(receiver)
    
    users = User.query.filter(User.id.in_(user_ids)).all()

    return jsonify([user.to_dict() for user in users])
    

