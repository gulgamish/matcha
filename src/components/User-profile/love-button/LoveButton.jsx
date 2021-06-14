import { FavoriteBorder, Favorite } from "@material-ui/icons"
import React from "react"
import "./style.css"

const LoveButton = ({
    label = "LOVE",
    isActive = false,
    onClick = () => {}
}) => {


    return (
        <div className="love-btn-container" onClick={onClick}>
            <div className="btn-icon">
                {isActive ? <Favorite /> : <FavoriteBorder />}
            </div>
            <div className="btn-label">
                {label}
            </div>
        </div>
    )
}

export default LoveButton;