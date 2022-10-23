import React, {useContext, useEffect, useRef, useState} from "react";
import './messenger.css'
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import {Context} from "../../context/Context"
import axios from "axios";
import {io} from 'socket.io-client';

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef()
    const {user} = useContext(Context);
    const scrollRef = useRef()

    // run socket just once
    useEffect(() => {
        socket.current = io("ws://localhost:5100");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {    //on = taking from server
            console.log(users)
        })
    }, [user])

    // get conversation from backend (between 2 memebers)
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

    // get messages from specific conversation from backend
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

    // button send handles a submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user._id     // find the member that is not us (the id that is different from our id)
        )

        socket.current.emit("sendMessage", {    //emit because I'm sending something
            senderId: user._id,  // user._id is our current user (the one logged in?)
            receiverId,
            text: newMessage,
        })

        // set messages to what was sent
        try {
            const res = await axios.post("/messages", message)
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (err) {
            console.log(err)
        }
    };

    //scroll on its own as new messages are added
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
                                    {messages.map((m) => (
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
                            <span className="noConversationText">Abre una conversaciòn para iniciar un chat!</span>
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