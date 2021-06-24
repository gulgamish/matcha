import { useMutation, useQuery } from "@apollo/client"
import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { SEND_MESSAGE } from "../../../GraphQl/Match/Mutations"
import { GET_MESSAGES } from "../../../GraphQl/Match/Queries"
import MessageInput from "./message-input/MessageInput"
import Message from "./Message/Message"
import "./style.css"

const GetMessages = ({
    from
}) => {
    const { loading, data, error } = useQuery(GET_MESSAGES, {
        variables: {
            from
        }
    })
    if (!loading)
        console.log(data);

    return (
        <div>
            {
                !loading && data.getMessages && (
                    data.getMessages.map(user => (
                        <Message
                            received={user.from == from}
                            sent={user.from != from}
                            content={user.content}
                        />
                    ))
                )
            }
        </div>
    )
}

const Conversation = ({
    selectedUser: from
}) => {
    const [ message, setMessage ] = useState("");
    const [ sendMessage ] = useMutation(SEND_MESSAGE, {
        onCompleted: (data) => {
            console.log(data);
        },
        onError: (err) => {
            console.log(err);
        }
    })
    

    return (
        <div className="conversation-container">
            <div className="messages">
                {from != null && <GetMessages from={from} />}
            </div>
            <div className="m-send">
                {from != null && (
                    <MessageInput
                        placeholder="Send a message"
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        submit={() => {
                            if (message != "")
                                sendMessage({
                                    variables: {
                                        to: from,
                                        content: message
                                    }
                                });
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default Conversation;