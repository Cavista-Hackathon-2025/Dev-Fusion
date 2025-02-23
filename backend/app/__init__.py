
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS # type: ignore
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO
# from flask_mail import Mail
from app.config import Config
from flask_migrate import Migrate



# Bootstrap()
db = SQLAlchemy()
bcrypt =Bcrypt()
socketio = SocketIO()
# mail = Mail()
# migrate = Migrate() 

def create_app(config_class = Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app, supports_credentials=True)
    # Migrate.init_app(app, db)
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
