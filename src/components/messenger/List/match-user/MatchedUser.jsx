import React from "react"
import "./style.css"
import img from "../../../../img/profile-img.JPG"

const MatchedUser = () => {


    return (
        <div className="m-container">
            <div className="m-container-profile-photo">
                <img
                    className="m-profile-photo"
                    src={img}
                />
            </div>
            <div className="m-container-username">
                <span className="username">Jumper</span>
            </div>
        </div>
    )
}

export default MatchedUser;