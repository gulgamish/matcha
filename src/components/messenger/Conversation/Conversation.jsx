import React from "react"
import MessageInput from "./message-input/MessageInput"
import Message from "./Message/Message"
import "./style.css"

const Conversation = () => {
    

    return (
        <div className="conversation-container">
            <div className="messages">
                <Message
                    received
                    content="salamsalamsalamsalamsalamsalamsalamsalam"
                />
            </div>
            <div className="m-send">
                <MessageInput
                    placeholder="Send a message"
                    onChange={(e) => {
                        console.log(e.target.value);
                    }}
                />
            </div>
        </div>
    )
}

export default Conversation;