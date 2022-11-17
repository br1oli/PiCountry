const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('Actividad', {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        dificultad: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            allowNull: false,
        },

        duración: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        temporada: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
            allowNull: false,
        },

 });
};
