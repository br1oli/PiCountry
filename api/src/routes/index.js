const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios')
const { Country, Actividad} = require('../db')
const {Op, where, Model, UUID} = require('sequelize')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async (req, res) => {
    const {nombree} = req.query
    const AllCoutries = await Country.findAll({
        include: Actividad,
        order: [[
            'name', 'ASC'
            ]]},
    );
    console.log("🚀 ~ file: index.js ~ line 18 ~ router.get ~ AllCoutries", AllCoutries)
    if(!nombree){
        console.log("todos los países")
        res.json(AllCoutries)
    }else{
        busquedaPorNombre = await AllCoutries.filter((country)=> country.name.toLowerCase().startsWith(nombree.toLowerCase()))
        if(busquedaPorNombre.length){
            res.json(busquedaPorNombre)
        }else{
            res.status(404).send('Error en búsqueda por nombre')
            console.log('Error búsqueda POR NOMBRE')
        }
    }
});


router.get('/countries/:id',  (req, res) => {
    const  porId = req.params.id.toUpperCase();
    // console.log(porId)
        Country.findOne({
            where:{
                id: porId,
            },
            include: Actividad,
        })
        .then(datos => {
            console.log(datos, "DATOS BACK")
            res.json(datos)})
        .catch(err => 
            res.status(err).send("No se ha podido encontrar el país por id"))
});

router.get('/actividades', async (req, res)=> {
    try {
        const activities = await Actividad.findAll({
        include: 
            {model : Country,
        attributes: ['name'],
        through: {attributes: []
        }}
    
    })
    // console.log(activities)
    res.status(200).json(activities)  
    } catch (error) {
        console.log(error)
    }

});

router.post('/actividades', async (req, res) => {

    const {name, dificultad, duración, temporada, country} = req.body;

    try {
        let respuesta = await Actividad.create({
            name,
            dificultad,
            duración,
            temporada,
        })
        let actividadPais = await Country.findAll({
            where : { name : country}
    
        })
        respuesta.addCountry(actividadPais)
        res.status(200).send('Actividad creada con exito');
    }catch(error){
        console.log(error, "pifeaste creando la actividad mi rey")
    }
    
});






module.exports = router;





















































// router.put('/actividades/:id', async (req, res) =>{
//     try {
//         let porID = req.params.id;
//         let { name, dificultad, duración, temporada, country} = req.body;
        
//         await Actividad.update({name,
//             dificultad,
//             duración,
//             temporada,
//             },{
//                 where:{
//                     id: porID,
//                 },
//         });
//         res.status(200).send('se actualizó la actividad con exito')
//     } catch (error) {
//         res.status(404).send('No se pudo actualizar la actividad')
//     }
// });

// router.delete('/actividades/:id', async (req, res) => {
//     try {
//         let porID = req.params.id;
//         await Actividad.destroy({
//             where: {
//                 id: porID
//             },
//         });
//         res.status(200).send('La actividad se ha eliminado con exito')
//     } catch (error) {
//         res.status(404).send('No se pudo eliminar la actividad')
//     }
// })


