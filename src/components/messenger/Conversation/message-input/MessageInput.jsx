import { Button, Fab } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import React from "react"
import "./style.css"

const MessageInput = ({
    placeholder,
    value,
    setValue,
    submit,
}) => {


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}
        >
            <div className="msg-input-container">
                <div className="msg-input">
                    <input
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        type="text"
                        className="m-input"
                        placeholder={placeholder}
                    />
                </div>
                <button
                    className="msg-button"
                    type="submit"
                >
                    <Send color="primary" />
                </button>
            </div>
        </form>
    )
}

export default MessageInput;