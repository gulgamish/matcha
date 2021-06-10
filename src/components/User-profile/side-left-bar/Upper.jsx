import { Typography } from "@material-ui/core"
import React, { useState } from "react"
import "./style.css"
import img from "../../../img/profile-img.JPG"
import img2 from "../../../img/profile.jpg"
import { ProgressBar } from "react-bootstrap"
import "font-awesome/css/font-awesome.min.css"

const Upper = () => {


    return (
        <div className="upper-container">
            <div className="profile-image-container">
                <img
                    src={img}
                    className="profile-image"
                />
            </div>
            <div className="profile-info">
                <div className="upper-left-1">
                    <div className="fullname">
                        Ayman ELAMRANI
                    </div>
                    <div className="distance">
                        <i className="fa fa-map-marker distance-icon"></i>
                        <span className="distance-label">30 km</span>
                    </div>
                </div>
                <span className="ratings-label">Fame Rating</span>
                <div className="ratings">
                    <span className="percentage">87 %</span>
                    <ProgressBar now={87} />
                </div>
            </div>
        </div>
    )
}

export default Upper;