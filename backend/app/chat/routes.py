from flask import (render_template, url_for, flash,jsonify,
                   redirect, request, abort, Blueprint)
from flask_socketio import SocketIO, emit
from openai import OpenAI
import os

from app import socketio,db




chat = Blueprint('chat',__name__)


client = OpenAI(
  api_key="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"
)


@chat.route("/send_message", methods=["POST","GET"])
def send_message():
    user_data = request.get_json()

    if not user_data or "message" not in user_data:
        return jsonify({"error": "Message is required"}), 400  # Return 400 Bad Request

    client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key="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",
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
            # {
            # "type": "text",
            # "text": ""+user_data["message"],
            # },
        
        
        ]
        }
    ]
    )
    print(completion.choices[0].message.content)
    return jsonify({"message": completion.choices[0].message.content}), 200
    # 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