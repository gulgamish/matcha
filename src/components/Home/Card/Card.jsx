import React from 'react'
import "./Style.css"
import img from "../../../img/dating.jpg"
import 'font-awesome/css/font-awesome.min.css';

const Card = () => {


    return (
        <div className="card">
            <div className="media">
                <img
                    src={img}
                />
            </div>
            <div className="content">
                <div className="fullname">
                    <div className="icon">
                        <i className="fa fa-user"></i>
                    </div>
                    <div className="label">
                        Ayman Elamrani
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;