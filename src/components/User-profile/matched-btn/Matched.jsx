import { Check } from "@material-ui/icons"
import React from "react"
import "./style.css"

const Matched = ({
    label = "matched"
}) => {

    return (
        <div className="c-container" aria-disabled>
            <div className="c-icon">
                <Check color="primary" />
            </div>
            <div className="c-label">
                {label.toUpperCase()}
            </div>
        </div>
    )
}

export default Matched;