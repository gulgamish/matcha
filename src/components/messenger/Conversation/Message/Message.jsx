import React from "react"
import "./style.css"

const Message = ({
    sent = false,
    received = false,
    content = ""
}) => {


    return (
        <div className={`message-container ${sent ? "flex-end" : ""}`}>
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