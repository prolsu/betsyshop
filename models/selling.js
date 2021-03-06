module.exports = function(sequelize, DataTypes) {
  const Selling = sequelize.define(
    "Selling",
    {
      item: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
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
          len: [1]
        }
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDecimal: true
        }
      },
      active: {
        type: DataTypes.INTEGER,
        default: 1
      },
      seller: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      }
    },
    {
      freezeTableName: true
    }
  );

  return Selling;
};
