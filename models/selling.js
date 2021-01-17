module.exports = function(sequelize, DataTypes) {
  const Selling = sequelize.define(
    "Selling",
    {
      item: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [1],
          isAlphanumeric: true
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlpha: true
        }
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDecimal: true
        }
      }
    },
    {
      freezeTableName: true
    }
  );

  return Selling;
};
