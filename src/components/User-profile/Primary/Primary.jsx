import React from "react"
import { ProgressBar } from "react-bootstrap"
import { Chip, ListItemIcon, Menu, MenuItem, Typography } from "@material-ui/core"
import "font-awesome/css/font-awesome.min.css"
import "./style.css"

const PrimaryInformations = ({

}) => {


    return (
        <div className="p-container">
            <section className="s-1">
                <div className="fullname">
                    Ayman ELAMRANI
                </div>
                <div className="distance">
                    <i className="fa fa-map-marker distance-icon"></i>
                    <span className="distance-label">30 km</span>
                </div>
            </section>
            <section className="s-2">
                <span className="info-label">Fame Rating</span>
                <div className="info-d">
                    <span className="percentage">87 %</span>
                    <ProgressBar now={87} />
                </div>
            </section>
            <section className="s-3">
                <span className="info-label">Interests</span>
                <div className="interests-container">
                    {["vegan", "geek", "activist", "geek", "geek", "geek"].map(tag => (
                        <div className="tag-container">
                            <Chip
                                key={tag}
                                label={tag}
                                variant="outlined"
                                color="primary"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default PrimaryInformations;