from flask import  request,jsonify,Blueprint

from app import db, bcrypt
from app.models import Chat, User, Post
# from app.users.forms import (RegistrationForm, LoginForm, UpdateAccountForm,
#                                    RequestResetForm, ResetPasswordForm)
# from app.users.utils import save_pic, send_reset_email
users= Blueprint('users',__name__)

@users.route('/registration',methods = ['POST','GET'])
def registration():
    user_data = request.json
    print(user_data)
    # email = user_data['email']
    # password = user_data['password']
    username = user_data['username']
    # hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    # Check if email or username already exists
    existing_user = User.query.filter(
        (User.username == user_data['username'])
    ).first()

    if existing_user:
        return jsonify({"error": "User already exists"}), 401  # Return 401 Unauthorized

    user = User(username=username)
    new_chat = Chat(title="Chat", user_name=username)
    db.session.add(user)
    db.session.add(new_chat)
    db.session.commit()
    
    return jsonify({"message": "Account created successfully"}), 200

@users.route('/login',methods = ['POST','GET'])
def login():
    user_data = request.json
    email = user_data['email']
    password = user_data['password']
    print(user_data)
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password,password):
        return jsonify({"message": "Logged in successfully"}), 200
    else:
        return jsonify({"message": "Login failed"}), 401


@users.route('/account',methods = ['POST','GET'])

def account():
    
    user_data = request.json
    email = user_data['email']
    password = user_data['password']
    
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password,password):
        user.username = user_data.username.data
        user.email = user_data.email.data
        if user_data.picture:
            picture_file = user_data.picture
            user.image_file = picture_file
        db.session.commit()    
    return jsonify({"message": "Account updated successfully"}), 200

