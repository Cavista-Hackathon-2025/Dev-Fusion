
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
    allowed_origins = ["http://localhost:3000", "http://127.0.0.1:3000", "*"]  
    # CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
    CORS(app, supports_credentials=True)
    db.init_app(app)
    bcrypt.init_app(app)
    socketio.init_app(app)
    # mail.init_app(app)
    # app.app_context().push()

    from app.users.routes import users
    # from app.main.routes import main
    from app.chat.routes import chat
    # from app.errors.handlers import errors

    app.register_blueprint(users)
    # app.register_blueprint(main)
    app.register_blueprint(chat)
    # app.register_blueprint(errors)

    return app
