from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from apps.settings import Base
from flask_login import UserMixin

class User(UserMixin, Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True)
    password = Column(String(255), unique=False)
    name = Column(String(50), unique=False)
    picture_filename = Column(String(255), unique=True)

    chats = relationship("Chat", backref="user", lazy=True)

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

    def __repr__(self):
        return f'<User {self.name!r}>'
    
class Chat(Base):
    __tablename__ = 'chats'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    user_id = Column(Integer, ForeignKey("users.id"))


    def __repr__(self):
        return f'<Chat {self.name!r}>'
    
