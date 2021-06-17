import React from "react"
import Conversation from "./Conversation/Conversation"
import List from "./List/List"
import "./style.css"

const Messenger = () => {


    return (
        <div className="messenger-container">
            <List />
            <Conversation />
        </div>
    )
}

export default Messenger;