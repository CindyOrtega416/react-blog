import React from 'react';
import './message.css';
import {format} from 'timeago.js'

export default function Message({message, own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src="https://cdn.pixabay.com/photo/2016/11/29/03/36/woman-1867093_960_720.jpg"
                    alt=""
                />
                <p className="messageText">
                    {message.text}
                </p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    );
}