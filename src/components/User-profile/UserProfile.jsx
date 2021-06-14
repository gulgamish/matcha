import { Card, CardContent } from "@material-ui/core"
import React from "react"
import Left from "./left/Left"
import "./style.css"
import Upper from "./upper-bar/Upper"

const UserProfile = () => {


    return (
        <div className="user-profile-container">
            <Upper />
            <Left />
        </div>
    )
}

export default UserProfile;