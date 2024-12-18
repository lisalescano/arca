const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Pais = sequelize.define('Pais', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    Pais.associate = (models) => {
      Pais.hasMany(models.Vino, { foreignKey: 'paisId' });
      Pais.belongsTo(models.TipoDeVino, { foreignKey: 'tipoVinoId' });
    };
    return Pais;
  };