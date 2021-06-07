import React, { useState } from 'react'
import "./style.css"
import "font-awesome/css/font-awesome.min.css"

const Chip = ({
    label,
    isActive,
    onClick
}) => {
    console.log(label, isActive)

    return (
        <div
            className={`chip-container ${isActive ? "chip-active" : ""}`}
            onClick={onClick}
        >
            <div className="chip-icon">
            </div>
            <div className="chip-label">
                {label}
            </div>
            
        </div>
    )
}

export default Chip;