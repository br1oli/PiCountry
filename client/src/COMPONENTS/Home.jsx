import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountries, filterContinent, filterActivities, ascDesc, ordenAlfabetico, getActivities } from "../ACTIONS";
import Card from "./Card";
import Paginado from "./Paginado";
import Style from './Home.css';
import SearchBar from "./SearchBar";

export default function Home () {
    const dispath = useDispatch();

    const allCountries = useSelector ((state) => state.countries)
    const allActivities = useSelector ((state) => state.Activities)

    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(9)
    const indexOfLastCountries = currentPage * countriesPerPage

    const indexOfFirstCountries = indexOfLastCountries - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountries, indexOfLastCountries)

    const paginado = (numberPage) => {
        if(numberPage === 1){
            setCountriesPerPage(9)
        }else{
            setCountriesPerPage(10);
            setCurrentPage(numberPage);
        }
    }


    const [, setOrden] = useState('') //actualiza mi estado con los filtros
    const [,setAlfabetico] = useState('')


    // const paginado = (pageNumber) => {setCurrentPage(pageNumber)}

    useEffect(()=> { 
        dispath(getCountries());
        dispath(getActivities())
    },[dispath])

    function handleClick(e){
        e.preventDefault();
        dispath(getCountries());
    }

    function handleFilterContinent(e){
        e.preventDefault();
        // if(e.target.value === "All"){
        //     dispath(getCountries())
        // }
        dispath(filterContinent(e.target.value));
    }

    function handleActivities(e){
        e.preventDefault();
        // if(e.target.value === "All"){
        //     dispath(getCountries())
        // }
        dispath(filterActivities(e.target.value));
    }

    function handleAscDesc(e){
        e.preventDefault();
        // if(e.target.value === "All"){
        //     dispath(getCountries())
        // }
        dispath(ascDesc(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleAlfabetico(e){
        e.preventDefault();
        // if(e.target.value === "All"){
        //     dispath(getCountries())
        // }
        dispath(ordenAlfabetico(e.target.value));
        setCurrentPage(1);
        setAlfabetico(`filtro alfabetico ${e.target.value}`)
    }


    return (
        <div>
            <Link to='/actividades'><button>Crear Actividad</button></Link>
            <div className="henryMaps">   
                    <h1 >Henry Maps</h1>
            </div>
            <button onClick={e => {handleClick(e)}}>
                Volver a cargar los Países 
            </button>
            <div>
                <select onChange={e => handleAscDesc(e)} className="ordenPoblación">
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={e => handleFilterContinent(e)} className="continentes">
                    <option value='All'>Todos los continentes</option>
                    <option value='Antaroptctica'>Antartida</option>
                    <option value='South America'>Sudamérica</option>
                    <option value='Asia'>Asia</option>
                    <option value='Africa'>Africa</option>
                    <option value='Europe'>Europa</option>
                    <option value='North America'>Norteamérica</option>
                    <option value='Oceania'>Oceanía</option>
                </select>
                <select onChange={e => handleActivities(e)} className="actividades">
                    <option value='all'> ALL Actividades de todos los países</option>
                    {allActivities.map(act => {
                        // console.log("ALLactivitie HOME", allActivities[0])
                        return (
                            <option key={act.id} value={act.name}>{act.name}</option>
                        )
                    })}
                </select>
                <select onChange={e => handleAlfabetico(e)} className="ordenAlfabetico">
                    <option>Ordenes Alfabeticos</option>
                    <option value='az'>a-z</option>
                    <option value='za'>z-a</option>
                </select>
                <div className="paginado">
                    <Paginado
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length}
                    paginado={paginado}
                    />
                </div>
                <SearchBar/>
            </div>
            <div>
                {
                    currentCountries?.map((e)=> {

                        // console.log(allCountries, "ALL COUNTRIES")
                        return(
                            <div className="Cartas" key={e.id}>
                                    <Link to={"/countries/" + e.id}>
                                        <Card 
                                        image={e.imagen} 
                                        name={e.name} 
                                        continent={e.continente}
                                        capital={e.capital}
                                        población={e.población}
                                        />
                                    </Link>
                                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}