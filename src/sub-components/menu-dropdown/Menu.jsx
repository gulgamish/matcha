import clsx from "clsx";
import React, { useEffect, useState } from "react"
import "./style.css"

const Menu = ({
    nav,
    subNavs
}) => {
    const [ activeClass, setActiveClass ] = useState(false);

    useEffect(() => {
        const onWindowClick = () => {
            setActiveClass(false);
        }

        window.addEventListener("click", onWindowClick);

        return () => {
            window.removeEventListener("click", onWindowClick);
        }
    }, []);

    return (
        <div className="menu-container" onClick={e => e.stopPropagation()}>
            <div
                className="menu-header"
                onClick={() => {
                    setActiveClass(!activeClass);
                }}
                
            >
                {nav}
            </div>
            <div className={clsx("menu-content", {
                showMenuD: activeClass
            })}>
                {subNavs}
            </div>
        </div>
    )
}

export default Menu;