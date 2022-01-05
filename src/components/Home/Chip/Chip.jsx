import React from 'react'
import "./style.css"
import "font-awesome/css/font-awesome.min.css"

const Chip = ({
    label,
    isUpActive,
    isDownActive,
    onUpClick,
    onDownClick
}) => {

    return (
        <div
            className="chip-container"
        >
            <div className="chip-label">
                {label}
            </div>
            <div className="up-down">
                <div
                    className={`chip-up ${isUpActive ? "up-active" : ""}`}
                    onClick={onUpClick}
                >
                    <i className="fa fa-arrow-up"></i>
                </div>
                <div
                    className={`chip-down ${isDownActive ? "down-active" : ""}`}
                    onClick={onDownClick}
                >
                    <i className="fa fa-arrow-down"></i>
                </div>
            </div>
        </div>
    )
}

export default Chip;