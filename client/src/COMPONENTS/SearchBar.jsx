import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNameCountries } from "../ACTIONS";

export default function SearchBar(){
    const dispath = useDispatch()
    const [name, setName] = useState("")

    const [error, setError] = useState({})

    function validador(input) {
        let errors = {};
        if (!input.name) errors.name = "se requiere un nombre";
        else if (input.dificultad === 0)
            errors.dificultad = "solamente numeros positivos";
        else if (input.duración === 0)
            errors.duración = "solamente numeros positivos";
        else if (!input.temporada || input.temporada === "")
            errors.temporada = "falto temporada";
        else if (!input.country.length || input.country === [])
            errors.country = "falta pais";
        return errors;
    }

    

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispath(getNameCountries(name))
        if(!name){

        }
        setName("")
    }

    return (
        <div>
            <input value={name} type="text" placeholder="Buscar..." onChange={e => handleInputChange(e)}/>
            <button type="submit" onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </div>
    )
}