from flask import Blueprint, jsonify
from sqlalchemy import or_, and_
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
    

@chats_bp.route("/get_messages/<int:sender_id>/<int:receiver_id>")
def get_messages_for_chat(sender_id, receiver_id):
    """Queries messages that have been sent with a specific sender and receiver, creating a chat"""

    chats_query = (
        db_session.query(Message.id, Message.content, Message.sender_id, Message.receiver_id, Message.timestamp)
        .filter(
            or_(
                and_(Message.sender_id == sender_id, Message.receiver_id == receiver_id),
                and_(Message.sender_id == receiver_id, Message.receiver_id == sender_id)
            )   
        )
        .order_by(Message.timestamp)
    )

    message_dict_array = []
    for row in chats_query:
        message = {
            "id": row.id,
            "sender_id": row.sender_id,
            "receiver_id" : row.receiver_id,
            "content": row.content,
            "timestamp": row.timestamp
        }
        message_dict_array.append(message)

        

    return jsonify(message_dict_array)