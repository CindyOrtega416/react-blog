import React from 'react'
import Conversation from "../conversations/Conversation";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";

export default function Sidebar({user, conversations, setCurrentChat}) {
  return (
    <div className="chatMenu">
    <div className="chatMenuWrapper">
        <input placeholder="Buscar amigos" className="chatMenuInput" />
        {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
            </div>
            // <Link to={`/messenger/${c._id}`} key={c._id}>
            // <Conversation conversation={c} currentUser={user} />
            // </Link>
        ))}

    </div>
</div>
  )
}
