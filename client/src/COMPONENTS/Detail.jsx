import React, { useState, useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import  {getDetail}  from '../ACTIONS';
import { useDispatch, useSelector } from "react-redux";
import s from './Detail.css'

export default function CountryID(props){
    // const idd = props.match.params.id
    const {id}= useParams()

const dispatch = useDispatch()

useEffect(()=>{
    dispatch(getDetail(id))
},[dispatch])

useEffect(()=>{
    return() => console.log('el componente ha sido removido')
},[])


const detailsCountry = useSelector((state) => state.countryD)
console.log(detailsCountry, "Details country")
    return(
        <div>
            {
                detailsCountry.length !== null || undefined  ?

                <div>
                    <div  className="contenedor">
                        <div className="datos">
                            <div className="nombree">
                                <h3>Nombre del pais: </h3>
                                <div className="nombre">
                                    <h1>{detailsCountry.name}</h1>
                                </div>
                            </div>
                                    <img  src={detailsCountry.imagen} alt='img'/>
                            <div>
                                            <h4 >Contiente: {detailsCountry.continente}</h4>
                                        <h4 >Subregion: {detailsCountry.subregión}</h4>
                                    <h4 >Área: {detailsCountry.área} km2 </h4>
                                <h4 >Población: {detailsCountry.población} habiantes</h4>
                                <h4 >Capital: {detailsCountry.capital}</h4>
                                <h4 >Id: {detailsCountry.id}</h4>
                                <h4>Actividades {detailsCountry.Actividads?.map((a)=> {
                                    <div>
                                        {a.name}
                                    </div>
                                })}</h4>
                            </div>

                        </div>
                    </div>
                </div>
                        :<h3>cargando...</h3>
        }
                <Link to={'/home'}> <button >Volver</button></Link>
        </div>

    )

}