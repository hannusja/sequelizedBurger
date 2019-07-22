module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
      }
    },
    devoured: { 
      type: DataTypes.BOOLEAN, 
      allowNull: false, 
      defaultValue: false 
    }
  })
  Burger.associate = function (models) {
    models.Burger.belongsTo(models.Cook, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Burger
}