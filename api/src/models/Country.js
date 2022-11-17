const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING,
      // allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },

    continente: {
      type: DataTypes.STRING,
      allowNull: false
    },

    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },

    subregión: {
      type: DataTypes.STRING,
    },

    área: {
      type: DataTypes.INTEGER
    },

    población: {
      type: DataTypes.INTEGER
    },

    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};
