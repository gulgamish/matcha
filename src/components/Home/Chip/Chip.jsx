import React, { useState } from 'react'
import "./style.css"
import "font-awesome/css/font-awesome.min.css"

const Chip = ({
    label
}) => {
    const [ active, setActive ] = useState(false);

    return (
        <div
            className={`chip-container ${active ? "chip-active" : ""}`}
            onClick={() => {
                setActive(!active)
            }}
        >
            <div className="icon">
            </div>
            <div className="label">
                {label}
            </div>
        </div>
    )
}

export default Chip;