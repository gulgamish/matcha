import { useMutation, useQuery, useSubscription } from "@apollo/client"
import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { SEND_MESSAGE } from "../../../GraphQl/Match/Mutations"
import { GET_MESSAGES } from "../../../GraphQl/Match/Queries"
import { NEW_MESSAGE } from "../../../GraphQl/Match/Subscriptions"
import MessageInput from "./message-input/MessageInput"
import Message from "./Message/Message"
import "./style.css"

const Conversation = ({
    selectedUser: from
}) => {
    const [ message, setMessage ] = useState("");
    const [ messages, setMessages ] = useState([]);
    const { loading, data, error } = useQuery(GET_MESSAGES, {
        variables: {
            from
        }
    })
    const [ sendMessage ] = useMutation(SEND_MESSAGE, {
        onCompleted: ({ sendMessage: { from, to, content } }) => {
            setMessages([
                ...messages,
                { from, to, content }
            ]);
        },
        onError: (err) => {
            console.log(err);
        }
    })
    const { data: dataNewMessage , loading: loadingNewMessage } = useSubscription(NEW_MESSAGE);
    const messagesRef = useRef();

    useEffect(() => {
        if (!loadingNewMessage) {
            if (dataNewMessage.newMessage.from == from)
                setMessages([
                    ...messages,
                    dataNewMessage.newMessage
                ])
        }
    }, [dataNewMessage])

    useEffect(() => {
        if (!loading)
            setMessages(data.getMessages);
    }, [data])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo({
                top: messagesRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages]);

    console.log(messages);
    

    return (
        <div className="conversation-container">
            <div className="m-header">
                
            </div>
            <div className="messages" ref={messagesRef}>
                {
                    messages && (
                        messages.map(user => (
                            <Message
                                id={user.id}
                                received={user.from == from}
                                sent={user.from != from}
                                content={user.content}
                            />
                        ))
                    )
                }
            </div>
            <div className="m-send">
                <MessageInput
                    placeholder="Send a message"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    submit={() => {
                        if (message != "") {
                            sendMessage({
                                variables: {
                                    to: from,
                                    content: message
                                }
                            });
                        }
                        setMessage("");
                    }}
                />
            </div>
        </div>
    )
}

export default Conversation;