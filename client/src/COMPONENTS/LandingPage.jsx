import React from "react";
import { Link } from "react-router-dom";
import Style from "./LandingPage.css"

export default function LandingPage(){
    return (
        <div className="Landing">
            <div className="Bienvenidos ">
                <h1>🌐Henry Maps🌐</h1>
            </div>
            <div className="btnn">

                <Link to='/home'>
                    <div>
                        <button>Ingresar</button>
                    </div>
                </Link>
            </div>
        </div>
    )
}