from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from settings import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    picture_filename = Column(String(255), unique=True)
    chats = relationship("Chat", backref="user", lazy=True)


    def __init__(self, name=None, picture_filename=None):
        self.name = name
        self.picture_filename = picture_filename

    def __repr__(self):
        return f'<User {self.name!r}>'
    
class Chat(Base):
    __tablename__ = 'chats'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    def __init__(self, name=None, user_id=None):
        self.name = name
        self.user_id = user_id

    def __repr__(self):
        return f'<Chat {self.name!r}>'
    
