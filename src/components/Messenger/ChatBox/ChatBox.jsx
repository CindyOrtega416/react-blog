import React, { useContext, useEffect, useRef, useState } from "react";

import Message from "../message/Message";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';

export default function Chat({currentChat, messages, scrollRef, user, setNewMessage, newMessage, handleSubmit, conversations}) {
  console.log('current chat from chat', currentChat)

  const { conversationId } = useParams();

  
   

    return (
    <></>
  )
}
