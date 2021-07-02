import { Fab } from "@material-ui/core"
import { Clear as ClearIcon } from "@material-ui/icons"
import React from "react"
import "./style.css"

const Clear = ({
    onClick
}) => {


    return (
        <div className="clear-container">
            <Fab
                onClick={onClick}
            >
                <ClearIcon />
            </Fab>
        </div>
    )
}

export default Clear;