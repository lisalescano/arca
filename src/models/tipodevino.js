const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const TipoDeVino = sequelize.define('TipoDeVino', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  TipoDeVino.associate = (models) => {
    TipoDeVino.hasMany(models.Pais, { foreignKey: 'tipoVinoId' });
  };
  return TipoDeVino;
};