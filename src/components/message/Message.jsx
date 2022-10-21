import React from 'react';
import './message.css'

export default function Message({own}) {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src="https://cdn.pixabay.com/photo/2016/11/29/03/36/woman-1867093_960_720.jpg"
                    alt=""
                />
                <p className="messageText">Hello this is a message</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    );
}