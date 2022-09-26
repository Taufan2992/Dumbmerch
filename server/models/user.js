'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
            //hasMany to product model
            user.hasMany(models.product, {
              as: "products",
              foreignKey: {
                name: "idUser",
              },
            });
      
            //hasMany association to transaction model
            user.hasMany(models.transaction, {
              as: "buyerTransactions",
              foreignKey: {
                name: "idBuyer",
              },
            });
            user.hasMany(models.transaction, {
              as: "sellerTransactions",
              foreignKey: {
                name: "idSeller",
              },
            });
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};