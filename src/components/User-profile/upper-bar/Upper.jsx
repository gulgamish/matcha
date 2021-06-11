import { Chip, Typography } from "@material-ui/core"
import React, { useState } from "react"
import "./style.css"
import img from "../../../img/profile-img.JPG"
import img2 from "../../../img/profile.jpg"
import { ProgressBar } from "react-bootstrap"
import "font-awesome/css/font-awesome.min.css"
import { Button } from "@material-ui/core"
import { ViewCarouselOutlined, MoreVert } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"

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
                <div className="upper-left-2">
                    <span className="ratings-label">Fame Rating</span>
                    <div className="ratings">
                        <span className="percentage">87 %</span>
                        <ProgressBar now={87} />
                    </div>
                </div>
                <div className="upper-left-3">
                    {["vegan", "geek", "activist"].map(tag => (
                        <div className="tag-container">
                            <Chip
                                key={tag}
                                label={tag}
                                variant="outlined"
                                color="primary"
                            />
                        </div>
                    ))}
                </div>
                <div className="upper-left-4">
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ViewCarouselOutlined />}
                    >
                        view photos
                    </Button>
                </div>
            </div>
            <div className="icon-bar">
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>
    )
}

export default Upper;