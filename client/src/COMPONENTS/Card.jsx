import React from "react";
import { Link } from "react-router-dom";
import S from "./Carta.css"

export default function Card({image, name, continent, capital, población}){
    if(!name){
        return (
                <div>No existe este país</div>
                
            
        )
    }else{
        
        return (
            <div className="Carta">
                <div className="CartaName">
                    <h1>{name}</h1>
                </div>
                <h3>{capital}</h3>
                <img src={image} alt='img not found'/>
                <h4>{continent}</h4>
            </div>
        );
    }
}