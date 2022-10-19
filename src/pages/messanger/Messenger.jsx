import React from "react";
import './messenger.css'
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";

export default function Messenger() {
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Buscar amigos" className="chatMenuInput"/>
                    <Conversation/>
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        <Message/>
                        <Message own={true}/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>
                        <Message/>

                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder="Escribe algo"></textarea>
                        <button className="chatSubmitButtom">Enviar</button>
                    </div>
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">

                </div>
            </div>
        </div>
    )
}