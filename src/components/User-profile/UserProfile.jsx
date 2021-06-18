import { Card, CardContent } from "@material-ui/core"
import React from "react"
import Images from "./Images/Images"
import PrimaryInformations from "./Primary/Primary"
import "./style.css"
import Upper from "./upper-bar/Upper"

const UserProfile = () => {


    return (
        <div className="user-profile-container">
            <div className="upper-container">
                <Images />
                <PrimaryInformations />
            </div>
        </div>
    )
}

export default UserProfile;