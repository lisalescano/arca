const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Vino = sequelize.define('Vino', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    });
    Vino.associate = (models) => {
      Vino.belongsTo(models.Pais, { foreignKey: 'paisId' });
    };
    return Vino;
  };