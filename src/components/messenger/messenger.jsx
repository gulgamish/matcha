import React, { useState } from "react"
import Conversation from "./Conversation/Conversation"
import List from "./List/List"
import "./style.css"

const Messenger = () => {
    const [ selectedUser, setSelectedUser ] = useState(null);

    console.log(selectedUser)

    return (
        <div className="messenger-container">
            <List
                setSelectedUser={setSelectedUser}
            />
            <Conversation
                selectedUser={selectedUser}
            />
        </div>
    )
}

export default Messenger;