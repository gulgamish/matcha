import { Check } from "@material-ui/icons"
import React from "react"
import "./style.css"

const Connected = ({
    children
}) => {

    return (
        <div className="c-container" aria-disabled>
            <div className="c-icon">
                <Check color="primary" />
            </div>
            <div className="c-label">
                {children}
            </div>
        </div>
    )
}

export default Connected;