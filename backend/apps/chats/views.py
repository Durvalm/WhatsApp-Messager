from flask import Blueprint, jsonify
from app import socketio
from sqlalchemy import or_, and_, desc
from ..models import User, Message
from ..settings import db_session
from datetime import datetime

chats_bp = Blueprint("chats", __name__, url_prefix="/chats")

@chats_bp.route("/get_all/<int:user_id>", methods=["GET"])
def get_chats_for_user(user_id):
    # Return all chats that current user has had messages
    chats_query = db_session.query(Message.sender_id, Message.receiver_id).filter(
        or_(Message.sender_id == user_id, Message.receiver_id == user_id)).distinct()
    
    # Extract user IDs from query
    user_ids = set()
    for chat in chats_query:
        sender, receiver = chat
        if sender != user_id:
            user_ids.add(sender)
        if receiver != user_id:
            user_ids.add(receiver)
    
    last_messages_dict = {}
    for user in user_ids:
        last_message = get_last_message(user_id, user)
        last_messages_dict[user] = last_message
    
    users = User.query.filter(User.id.in_(user_ids)).all()
    result_list = []
    for user in users:
        user.last_message = last_messages_dict[user.id]
        user_info = user.to_dict()
        user_info['last_message'] = user.last_message.to_dict() if user.last_message else None
        result_list.append(user_info)

    sorted_result_list = sorted(result_list, key=lambda x: x['last_message']['timestamp'] if x['last_message'] else '')

    # Return JSON response
    return jsonify(sorted_result_list)

@chats_bp.route("/get_messages/<int:sender_id>/<int:receiver_id>", methods=["GET"])
def get_messages_for_chat(sender_id, receiver_id):
    """Queries messages that have been sent with a specific sender and receiver, creating a chat"""

    chats_query = (
        db_session.query(Message)
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

@chats_bp.route("create_chat/<int:sender_id>/<int:receiver_id>", methods=['POST'])
def create_chat(sender_id, receiver_id):
    """Empty message between 2 users will create a chat"""
    message = Message(content='', sender_id=sender_id, receiver_id=receiver_id, timestamp=datetime.utcnow())
    db_session.add(message) 
    db_session.commit()

    return jsonify({'message': 'Chat created successfuly'})


def get_last_message(sender_id, receiver_id):
    last_message = db_session.query(Message).filter(
        or_(
            and_(Message.sender_id == sender_id, Message.receiver_id == receiver_id),
            and_(Message.sender_id == receiver_id, Message.receiver_id == sender_id)
        )
    ).order_by(desc(Message.timestamp)).first()

    return last_message

def create_message(sender_id, receiver_id, content):
    message = Message(content=content, sender_id=sender_id, receiver_id=receiver_id, timestamp=datetime.utcnow())
    db_session.add(message) 
    db_session.commit()

    return message.to_dict()

@socketio.on('message')
def handle_message_sent(data):
    message = create_message(data['sender_id'], data['receiver_id'], data['content'])
    message['timestamp'] = message['timestamp'].strftime('%Y-%m-%d %H:%M:%S UTC')
    socketio.emit('message', message)

@socketio.on('connect')
def handle_connect():
    print('Client connected')   

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')   