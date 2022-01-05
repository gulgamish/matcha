import { useMutation, useQuery, useSubscription } from "@apollo/client"
import React, { useEffect, useRef, useState } from "react"
import { SEND_MESSAGE } from "../../../GraphQl/Match/Mutations"
import { GET_MESSAGES } from "../../../GraphQl/Match/Queries"
import { NEW_MESSAGE } from "../../../GraphQl/Match/Subscriptions"
import useAlert from "../../tools/useAlert"
import MessageInput from "./message-input/MessageInput"
import Message from "./Message/Message"
import "./style.css"

const Conversation = ({
    selectedUser: from
}) => {
    const [ message, setMessage ] = useState("");
    const [ messages, setMessages ] = useState([]);
    const { SnackBar, setAlert } = useAlert();
    const { loading, data } = useQuery(GET_MESSAGES, {
        variables: {
            from
        },
        onError: (err) => {
            setAlert({
                open: true,
                isError: true,
                msg: "Error, please refresh page"
            })
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
            setAlert({
                open: true,
                isError: true,
                msg: "Error, please try again"
            })
        }
    })
    const { data: dataNewMessage , loading: loadingNewMessage } = useSubscription(NEW_MESSAGE);
    const messagesRef = useRef();

    useEffect(() => {
        if (!loadingNewMessage) {
            if (dataNewMessage.newMessage.from === from)
                setMessages([
                    ...messages,
                    dataNewMessage.newMessage
                ])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataNewMessage])

    useEffect(() => {
        if (!loading)
            setMessages(data.getMessages);
    }, [data, loading])

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo({
                top: messagesRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages]);


    return (
        <div className="conversation-container">

            <div className="messages" ref={messagesRef}>
                {messages.map(user => (
                    <Message
                        id={user.id}
                        received={user.from === from}
                        sent={user.from !== from}
                        content={user.content}
                    />
                ))}
            </div>
            <div className="m-send">
                <MessageInput
                    placeholder="Send a message"
                    setValue={setMessage}
                    value={message}
                    disabled={from === null}
                    submit={() => {
                        if (message !== "") {
                            setMessage("");
                            sendMessage({
                                variables: {
                                    to: from,
                                    content: message
                                }
                            });
                        }
                    }}
                />
            </div>
            <SnackBar />
        </div>
    )
}

export default Conversation;