
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # type: ignore
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO
# from flask_mail import Mail
from app.config import Config




# Bootstrap()
db = SQLAlchemy()
bcrypt =Bcrypt()
socketio = SocketIO()
# mail = Mail()


def create_app(config_class = Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    socketio.init_app(app)
    # mail.init_app(app)
    # app.app_context().push()

    from app.users.routes import users
    # from app.main.routes import main
    # from app.posts.routes import posts
    # from app.errors.handlers import errors

    app.register_blueprint(users)
    # app.register_blueprint(main)
    # app.register_blueprint(posts)
    # app.register_blueprint(errors)

    return app
