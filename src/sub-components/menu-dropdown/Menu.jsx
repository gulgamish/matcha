import React, { useState } from "react"
import "./style.css"

const Menu = ({
    nav,
    subNavs
}) => {
    const [ activeClass, setActiveClass ] = useState(false);


    return (
        <div className="menu-container">
            {nav}
            <div className="menu-content">
                {subNavs}
            </div>
        </div>
    )
}

export default Menu;