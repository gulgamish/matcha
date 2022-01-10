import { Send } from "@material-ui/icons"
import React, { useState } from "react"
import "./style.css"

const MessageInput = ({
    placeholder,
    value,
    setValue,
    submit,
    disabled
}) => {
    const [ error, setError ] = useState("");

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
                            if (e.target.value.length <= 500) {
                                setValue(e.target.value);
                                setError("");
                            }
                            else
                                setError("Message is too long");
                        }}
                        type="text"
                        className="m-input"
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                </div>
                <button
                    className="msg-button"
                    type="submit"
                >
                    <Send color="primary" />
                </button>
            </div>
            {error !== "" && (
                <div className="error">
                    {error}
                </div>
            )}
        </form>
    )
}

export default MessageInput;