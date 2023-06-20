import React, { useContext, useEffect, useRef, useState } from "react";
import './messenger.css'

import ChatBox from "../../components/Messenger/ChatBox/ChatBox";
import { Context } from "../../context/Context"
import axios from "axios";
import { io } from 'socket.io-client';
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Messenger/Sidebar/Sidebar";

import Message from "../../components/Messenger/message/Message";

export default function Messenger() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [conversationIdRes, setConversationIdRes] = useState();
    const [chatId, setChatId] = useState("");
    const socket = useRef()
    const { user } = useContext(Context);
    const scrollRef = useRef()

    const location = useLocation()
    console.log('location', location)

    const { conversationId } = useParams();
    const navigate = useNavigate();
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
            console.log(3)
        })
    }, [user])

    // get conversation from backend (between 2 memebers)
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/conversations/" + user._id);
                setConversations(res.data);
                console.log('La data', res)
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
                setConversationIdRes(res.data.length > 0 ? res.data[0].conversationId : null);
                console.log('res', conversationIdRes)
            } catch (err) {
                console.log(err)
            }
        };
        getMessages();
    }, [currentChat])

    console.log('messages', messages)
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
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" })    //this scrolls down automatically as there are more messages
}, [messages])
    return (
        <div className="messenger">
            <Sidebar user={user}
                conversations={conversations}
                setCurrentChat={setCurrentChat} />
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