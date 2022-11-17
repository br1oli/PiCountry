const axios = require('axios');
const { Country } = require("../src/db");


//Me traigo la data de lla api y la guardo en la base de datos
async function countryDataBase() {
    const allCountries =  []
    if(!allCountries.length){
        const api  = await axios.get('https://restcountries.com/v3/all')
        var dataAPI = api.data.map((countrie) => {
            return {
                id: countrie.cca3,
                name: countrie.name.common,
                imagen: countrie.flags[0],
                continente: countrie.continents[0],
                capital: countrie.capital ? countrie.capital[0] : 'no se encontró ninguna capital',
                subregión: countrie.subregion ? countrie.subregion : 'no se encontró ninguna subregión',
                área: countrie.area,
                población: countrie.population,
            }
        })
        //creo la data en la db
        await Country.bulkCreate(dataAPI);
        console.log(' Se cargaron los datos en ls base de datos correctamente!')
    }
}

module.exports = {countryDataBase};