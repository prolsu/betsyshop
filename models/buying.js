module.exports = function(sequelize, DataTypes) {
  const Buyer = sequelize.define(
    "Buyer",
    {
      item: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      pirce: {
        type: DataTypes.STRING
      },
      // eslint-disable-next-line camelcase
      fkSelling_id: {
        type: DataTypes.STRING
      }
    },
    {
      freezeTableName: true
    }
  );

  return Buyer;
};
