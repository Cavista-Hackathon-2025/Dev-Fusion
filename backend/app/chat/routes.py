from flask import (render_template, url_for, flash,jsonify,
                   redirect, request, abort, Blueprint)
from flask_socketio import SocketIO, emit
from openai import OpenAI
import os
from app.models import Chat, Message, User

from app import socketio,db


api__key = os.environ.get('OpenAI_api_key')

chat = Blueprint('chat',__name__)




@chat.route("/send_message/<username>", methods=["POST","GET"])
def send_message(username):
    user = User.query.filter_by(username=username).first()
    user_chats = user.chats[0] 
    user_data = request.get_json()

    if not user_data or "message" not in user_data:
        return jsonify({"error": "Message is required"}), 400  # Return 400 Bad Request

    client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key='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'
)

    completion = client.chat.completions.create(
    extra_headers={
        "HTTP-Referer": "<YOUR_SITE_URL>", # Optional. Site URL for rankings on openrouter.ai.
        "X-Title": "<YOUR_SITE_NAME>", # Optional. Site title for rankings on openrouter.ai.
    },
    extra_body={},
    model="google/gemini-2.0-flash-lite-preview-02-05:free",
    messages=[
        {
        "role": "user",
        "content": [
            {
            "type": "text",
            "text": "you are acting a an llm in a mental health platform chatting with a user;  users message: "+user_data["message"]+"-- if there any thing like Crisis Detection & Escalation → If a user is in distress (e.g., mentions suicide), put an percent sign  '%'  at the end of the yout response only nothing else .... u get just "
            }, 
         
        
        
        ]
        }
    ]
    )

    new_message = Message(
    chat_id=user_chats.id,           # Associate with the retrieved chat
    prompt=user_data["message"],             # e.g., sender type
    ai_response= completion.choices[0].message.content# the message content
    )
    db.session.add(new_message)
    db.session.commit()
    print(new_message)
    return jsonify({"message": completion.choices[0].message.content}), 200
    
@chat.route("/get_chats/<username>", methods=["POST", "GET"])
def get_chats(username):
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    user_chats = user.chats  # This is a list of chat objects

    # Extract messages from each chat
    chats_data = []
    for chat in user_chats:
        chat_data = {
            "chat_id": chat.id,
            "messages": [
                {
                    "message_id": message.id,
                    "prompt": message.prompt,
                    "ai_response": message.ai_response,
                    "timestamp": message.timestamp.strftime("%Y-%m-%d %H:%M:%S")  # Format timestamp
                }
                for message in chat.messages  # Assuming chat.messages contains related messages
            ]
        }
        chats_data.append(chat_data)

    return jsonify({"chats": chats_data})

