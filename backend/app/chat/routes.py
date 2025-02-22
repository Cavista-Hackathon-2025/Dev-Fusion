from flask import (render_template, url_for, flash,
                   redirect, request, abort, Blueprint)
from flask_socketio import SocketIO, emit
import openai
import os

from app import socketio,db

from app import db


chat = Blueprint('posts',__name__)

@socketio.on("send_message")
def handle_message(data):
    user_message = data.get("message", "")

    if not user_message:
        emit("receive_message", {"error": "Message is required"})
        return

    response = openai.ChatCompletion.create(
        model="gpt-4-turbo",
        messages=[{"role": "user", "content": user_message}]
    )

    ai_response = response["choices"][0]["message"]["content"]

    emit("receive_message", {"user": "AI", "message": ai_response}, broadcast=True)
