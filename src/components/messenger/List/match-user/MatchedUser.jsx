import React from "react"
import clsx from "clsx"
import "./style.css"

const MatchedUser = ({
    img,
    username,
    onClick,
    selected
}) => {


    return (
        <div className={clsx("m-container", {
            selected
        })} onClick={onClick}>
            <div className="m-container-profile-photo">
                <img
                    className="m-profile-photo"
                    src={img}
                />
            </div>
            <div className="m-container-username">
                <span className="username">{username}</span>
            </div>
        </div>
    )
}

export default MatchedUser;