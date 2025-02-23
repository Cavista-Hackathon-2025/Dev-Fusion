from datetime import datetime
from app import db

from flask import url_for, current_app
from itsdangerous import URLSafeTimedSerializer as Serializer



# Define the User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, unique=True, nullable=False)
    email= db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, unique=True, nullable=False)

    # A user can have many chats
    chats = db.relationship('Chat', backref='user', lazy=True)


class Chat(db.Model):
    __tablename__ = 'chats'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=True)
    user_name = db.Column(db.Integer, db.ForeignKey('users.username'), nullable=False)
    # A chat can have many messages
    messages = db.relationship('Message', backref='chat', lazy=True)

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chats.id'), nullable=False)
    prompt = db.Column(db.Text, nullable=False)  # e.g., 'ai' or 'user'
    ai_response = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())


class Post(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    title = db.Column(db.Text,nullable=False)
    date_posted = db.Column(db.DateTime,nullable = False ,default =datetime.utcnow )
    content = db.Column(db.Text,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f' User {self.title} ,{self.date_posted}'

class Therapist(db.Model):
    __tablename__ = 'therapists'
    id = db.Column(db.Integer, primary_key=True)
    is_online = db.Column(db.Boolean, default=False)
    name = db.Column(db.Text, nullable=False)
    bio = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)           # Profile picture URL
    credentials = db.Column(db.Text)           # Degrees, certifications, etc.
    specialties = db.Column(db.Text)           # e.g., anxiety, depression
    license_number = db.Column(db.Text, unique=True)
    years_experience = db.Column(db.Integer)
    email = db.Column(db.Text, unique=True, nullable=False)
    phone = db.Column(db.Text, unique=True)
    rating = db.Column(db.Float)                      # Average user rating
