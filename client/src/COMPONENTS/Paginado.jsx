import React from "react";
import S from './Paginado.css'

export default function paginado({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    for(let i=1; i<= Math.ceil(allCountries/countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <div>
            
            {pageNumbers && pageNumbers.map(number =>(
                <div className="contenedor" key={number}>
                    
                        <button className="btn" onClick={()=> paginado(number)}>{number}</button>

                
                </div>

            )
            )}
        </div>
            
    )
}