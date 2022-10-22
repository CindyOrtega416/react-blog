import React, {useContext, useEffect, useRef, useState} from "react";
import './messenger.css'
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import {Context} from "../../context/Context"
import axios from "axios";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const {user} = useContext(Context);
    const scrollRef = useRef()

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

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/" + currentChat?._id)
                setMessages(res.data)
            } catch (err) {
                console.log(err)
            }
        };
        getMessages()
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        };
        try {
            const res = await axios.post("/messages", message)
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        scrollRef?.current?.scrollIntoView({behavior: "smooth"})    //this scrolls down automatically as there are more messages
    }, [messages])

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Buscar amigos" className="chatMenuInput"/>
                    {conversations.map((c) => (
                        <div onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={user}/>
                        </div>
                    ))}

                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat ? (
                            <>
                                <div className="chatBoxTop">

                                    {messages.map(m => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id}/>
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="Escribe algo"
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className="chatSubmitButtom" onClick={handleSubmit}>Enviar</button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">Abre una conversaciòn para iniciar un caht!</span>
                        )}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">

                </div>
            </div>
        </div>
    )
}