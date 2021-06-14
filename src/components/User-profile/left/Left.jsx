import React from "react"
import { Tabs, Tab, Typography } from "@material-ui/core"
import "./style.css"

const Left = () => {


    return (
        <div className="left-container">
            <Tabs indicatorColor="primary">
                <Tab  label="about" />

            </Tabs>
        </div>
    )
}

export default Left;