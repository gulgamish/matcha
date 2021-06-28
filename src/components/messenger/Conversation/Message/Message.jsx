import React from "react"
import "./style.css"

const Message = ({
    id,
    sent = false,
    received = false,
    content = ""
}) => {


    return (
        <div
            className={`message-container ${sent ? "flex-end" : ""}`}
            key={id}
        >
            {
                sent && (
                    <div className="message-sent">
                        {content}
                    </div>
                )
            }
            {
                received && (
                    <div className="message-received">
                        {content}
                    </div>
                )
            }
        </div>
    )
}

export default Message;