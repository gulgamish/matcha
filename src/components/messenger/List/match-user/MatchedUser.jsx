import React from "react"
import "./style.css"

const MatchedUser = ({
    img,
    username,
    onClick
}) => {


    return (
        <div className="m-container" onClick={onClick}>
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