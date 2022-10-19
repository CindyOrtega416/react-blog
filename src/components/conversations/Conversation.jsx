import React from 'react';
import './conversation.css'

export default function Conversation() {
    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src="https://cdn.pixabay.com/photo/2016/11/29/03/36/woman-1867093_960_720.jpg"
                alt=""
            />
            <span className="conversationName">Jane Doe</span>
        </div>
    );
}
