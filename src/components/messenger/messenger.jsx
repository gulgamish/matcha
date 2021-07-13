import React, { useState } from "react"
import Conversation from "./Conversation/Conversation"
import List from "./List/List"
import "./style.css"

const Messenger = () => {
    const [ selectedUser, setSelectedUser ] = useState(null);
    
    return (
        <div className="messenger-container">
            <List
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
            {selectedUser !== null ? (
                <Conversation
                    selectedUser={selectedUser}
                />
            ) : (
                <div className="conversation-container">
                    
                </div>
            )}
        </div>
    )
}

export default Messenger;