from flask import  request,jsonify,Blueprint

from app import db, bcrypt
from app.models import User, Post
# from app.users.forms import (RegistrationForm, LoginForm, UpdateAccountForm,
#                                    RequestResetForm, ResetPasswordForm)
# from app.users.utils import save_pic, send_reset_email
users= Blueprint('users',__name__)

@users.route('/registration',methods = ['POST','GET'])
def registration():
    user_data = request.json
    
    email = user_data['email']
    password = user_data['password']
    username = user_data['username']
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    # Check if email or username already exists
    existing_user = User.query.filter(
        (User.email == user_data['email']) | (User.username == user_data['username'])
    ).first()

    if existing_user:
        return jsonify({"error": "User already exists"}), 401  # Return 401 Unauthorized

    user = User(username=username,email=email,password=hashed_password)

    db.session.add(user)
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

# @users.route('/logout')
# def logout():
#     logout_user()
#     return redirect(url_for('users.login'))

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

# @users.route("/user/<username>")

# def user_posts(username):
#     page = request.args.get('page',1,type = int)
#     user = User.query.filter_by(username=username).first_or_404()
#     # posts = Post.query.paginate(page=page ,per_page = 10)
#     # posts = Post.query.filter_by(author=user)\
#     #     .order_by(Post.date_posted.desc())\
#     #     .paginate(page=page ,per_page = 3)





# @users.route("/reset_request",methods=['GET', 'POST'])
# def reset_request():
#     form = RequestResetForm()
#     if form.validate_on_submit():
#         user = User.query.filter_by(email=form.email.data).first()
#         send_reset_email(user)

#         flash('An email has been sent to reset your password')
#         return redirect(url_for('users.login'))
#     return render_template('reset_request.html', title='Reset Password', form=form)

# @users.route('/reset_password/<token>',methods=['GET', 'POST'])
# def reset_token(token):

#     if current_user.is_authenticated:
#         return redirect(url_for('main.home'))
#     user = User.verify_reset_token(token)
#     if user is None :
#         flash('Token hsa expired','warning')
#         return redirect(url_for('users.reset_request'))
#     form = ResetPasswordForm()
#     if form.validate_on_submit():
#         hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
#         user.password=hashed_password
#         db.session.commit()
#         flash(f'Your pass word has been updated')
#         return redirect(url_for('users.login'))
#     return render_template('reset_token.html', title='Reset Password', form=form)
