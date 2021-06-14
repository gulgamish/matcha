import { Chip, ListItemIcon, Menu, MenuItem, Typography } from "@material-ui/core"
import React, { useState } from "react"
import "./style.css"
import img from "../../../img/profile-img.JPG"
import img2 from "../../../img/profile.jpg"
import { ProgressBar } from "react-bootstrap"
import "font-awesome/css/font-awesome.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "@material-ui/core"
import { ViewCarouselOutlined, MoreVert, EmojiFlags, Block } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"
import LoveButton from "../love-button/LoveButton"

const Upper = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [ toggleHeart, setToggle ] = useState(false);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


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
                    <span className="info-label">Fame Rating</span>
                    <div className="info-d">
                        <span className="percentage">87 %</span>
                        <ProgressBar now={87} />
                    </div>
                </div>
                <div className="upper-left-5">
                    <span className="info-label">Gender</span>
                    <div className="info-d">
                        <span>Male</span>
                    </div>
                </div>
                <div className="upper-left-6">
                    <span className="info-label">Sexual Orientation</span>
                    <div className="info-d">
                        <span>Homosexual</span>
                    </div>
                </div>
                <div className="upper-left-7">
                    <span className="info-label">Bio</span>
                    <div className="info-d">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolorem, est maiores facere magni expedita fugit rerum quaerat. Molestiae corporis quis beatae corrupti. Dicta veniam explicabo, nemo commodi dolorem numquam!
                        </p>
                    </div>
                </div>
                <div className="upper-left-3">
                    <span className="info-label">Interests</span>
                    <div className="interests-container">
                        {["vegan", "geek", "activist", "geek", "geek", "geek"].map(tag => (
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
                </div>
                <div className="upper-left-4">
                    <LoveButton
                        isActive={toggleHeart}
                        onClick={() => {
                            setToggle(!toggleHeart);
                        }}
                    />
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
                        <IconButton
                            aria-label="more"
                            aria-controls="menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem key="report">
                                <ListItemIcon>
                                    <EmojiFlags />
                                </ListItemIcon>
                                <Typography variant="inherit">Report as fake account</Typography>
                            </MenuItem>
                            <MenuItem key="block">
                                <ListItemIcon>
                                    <Block />
                                </ListItemIcon>
                                <Typography variant="inherit">Block</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
        </div>
    )
}

export default Upper;