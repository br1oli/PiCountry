import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries } from '../ACTIONS';
import { useDispatch, useSelector } from "react-redux";



export default function ActivityCreate(){
    const dispath = useDispatch()
    
    const history = useHistory()
    
    const paises = useSelector((state)=> state.countries)
    
    useEffect(()=> {
        dispath(getCountries())
        // dispath(getActivities())        
    }, [dispath]);
    const [input, setInput] = useState({
        name: "",
        dificultad: 0,
        duración: 0,
        temporada: "",
        country: []
    })
    
    const [,setTemp] = useState('')
    const [, setCountry] = useState('')
    
    const [errors, setErrors ]= useState({});
    function validador(input) {
        let errors = {};
        if (!input.name) errors.name = "se requiere un nombre";
        else if (input.dificultad === 0)
            errors.dificultad = "solamente numeros positivos";
        else if (input.duración === 0)
            errors.duración = "solamente numeros positivos";
        else if (!input.temporada || input.temporada === "")
            errors.temporada = "falta temporada";
        // else if (!input.country.length || input.country === [])
        //     errors.country = "falta pais";
        return errors;
    }


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        console.log(input)
        setErrors(
            validador({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function handleSeason(e) {
        console.log(e.target.value);
        setInput({
            ...input,
            temporada: e.target.value,
        });
        setTemp(`Se agregó temporada ${e.target.value}`)
    }

    
    function handleSubmit(e){
        e.preventDefault();
        if (
            !input.name ||
            !input.temporada ||
            !input.dificultad ||
            !input.duración ||
            !input.country.length
        ) {
            alert("Formulario incompleto");
        } else {
            if (input.dificultad <= 0 || input.dificultad >= 6) {
                alert("la dificultad tiene que ser mayor a 0 y menor a 5");
            } else if (input.duration <= 0 || input.duration >= 25) {
                alert("la duracion tiene que ser mayor a 0 y menor a 24");
            } else {
                console.log('SOY INPUT',input)
                dispath(postActivities(input))
                setInput({
                    name: "",
                    dificultad: 0,
                    duración: 0,
                    temporada: "",
                    country: [],
                })
                alert('Actividad Creada!!')
                history.push('/home')
                }
        }   
    }
    
    function handleSelectCountry(e){
        if (input.country.includes(e.target.value)) {
            alert(`${e.target.value} ya esta puesto `);
        } else if (input.country.length > 9) {
            alert("no podes agregar más de 10 paises🥺");
        } else {
        // console.log(e.target.value);
        setInput({
            ...input,
            country: [...input.country, e.target.value],
        })
        setCountry(`Se agregó un país ${e.target.value}`)
        }
    }



    function deleteCountry(e){
        setInput({
            ...input,
            country: input.country.filter((c)=> c !== e)
        })
    }


    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Creá tu Actividad!</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                        {/* <label>Temporada:  </label> */}
                        <select
                        onChange={(e) => handleSeason(e)}
                        >
                        <option value="">Temporada</option>
                        <option value="Verano">Verano</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Primavera">Primavera</option>
                    </select>
                </div>
                <br/>
                <div>
                    <label>Nombre:  </label>
                    <input type="text" 
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && <div>{errors.name}</div>}
                </div>
                {errors.temporada && <div>{errors.temporada}</div>}
                <br/> 
                <div>
                    <label>Dificultad:  </label>
                    <input type="number"
                    max="5"
                    min="1"
                    value={input.dificultad}
                    name="dificultad"
                    onChange={(e) => handleChange(e)}
                    ></input>
                    {errors.dificultad && <div>{errors.dificultad}</div>}
                </div>
                <br/>
                <div>
                    <label>Duración en horas:  </label>
                        <input
                        type="number"
                        min="1"
                        max="6"
                        value={input.duración}
                        name="duración"
                        onChange={(e) => handleChange(e)}
                        />
                        {errors.duración && <div>{errors.duración}</div>}
                </div>
                <br/>
                {/* <label>Países que la practican:  </label> */}
                <select  onChange={(e)=> handleSelectCountry(e)}>
                            <option >Países que la practican:</option>
                    {paises?.map((p)=> {
                        return (
                            <option key={p.name} value={p.name}>{p.name}</option>
                    )
                    })}
                </select>
                <div>
                    {" "}
                        {input.country.map((c)=>{
                            return (
                                <div key={c}>
                                    {c}
                                    <button type="button" key={c} onClick={()=> deleteCountry(c)}>
                                        🚮
                                    </button>
                                </div>
                            );
                        })}
                </div>
                    {errors.country ? <div>{errors.country}</div> : <br/>}
                <button  type="submit">Crear Personaje</button>
            </form>
        </div>
    )
}