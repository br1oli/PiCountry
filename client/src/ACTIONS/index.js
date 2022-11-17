import axios from 'axios';

export function getCountries(){
    return async function(dispath){
        var json = await axios.get('/countries',{});
        
        return dispath({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function getDetail(id){
    return async function(dispath){
        const json = await axios.get(`/countries/${id}`)
        let detalle = json.data
        console.log(detalle, "detalle action")
        return dispath({
            type: 'GET_DETAIL',
            payload: detalle
        })
    }
}

export  function getNameCountries(payload){
    return async function(dispath){
        try{
            var json = await axios.get('/countries?nombree=' + payload);
            return dispath({
                type: "GET_NAME_COUNTRIES",
                payload: json.data
            })
        }catch(error){
            return dispath({
                type: "GET_NAME_COUNTRIES",
                payload: [<div></div>]
            })
            console.log(error, "error al buscar ese país por nombre")
        }
    }
}

export function getActivities(){
    return async function(dispath){
        var info = await axios.get('/actividades');

        return dispath({
            type: "GET_ACTIVITIES", 
            payload: info.data
        });
    }
}

export function postActivities(payload){
    return async function(dispath){
        const respuesta = await axios.post('/actividades',payload);
        console.log(respuesta)
        return respuesta;
    }
}


export function filterContinent(payload){
    return {
        type: 'FILTER_CONTINENT',
        payload
    }
}

export function filterActivities(payload){
    return {
        type: 'FILTER_ACTIVITIES',
        payload
    }
}

export function ascDesc(payload){
    return {
        type: 'ASC_DESC',
        payload
    }
}

export function ordenAlfabetico(payload){
    return {
        type: 'ALFABETICO',
        payload
    }
}

// export function getDetail(id){
//     return async function(dispath){
//         try {
//             var json = await axios.get(`http://localhost:3001/countries/${id}`);
//             console.log('JSON', json.data)
//             return dispath({
//                 type: 'GET_DETAIL',
//                 payload: json.data
//             })
//         } catch (error) {
//             console.log(error, "No se encontró ese detail")
//         }
//     }
// }
