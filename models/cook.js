module.exports = function(sequelize, DataTypes) {
    var Cook = sequelize.define("Cook", {
      cook_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: [1, 200]
            }
        }
    })
    Cook.associate = function(models) {
        models.Cook.hasMany(models.Burger, {
          onDelete: "CASCADE"
        })
    }
    return Cook
}