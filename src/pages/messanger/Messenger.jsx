import React, {useContext, useEffect, useState} from "react";
import './messenger.css'
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import {Context} from "../../context/Context"
import axios from "axios";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const {user} = useContext(Context);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Buscar amigos" className="chatMenuInput"/>
                    {conversations.map((c) => (
                        <Conversation conversation={c} currentUser={user}/>
                    ))}

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