//

const { DataTypes, Model, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize, Post) => {
  class Category extends Model {
  }

  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Category',
    createdAt: false,
    updatedAt: false
  });

  Category.sync();

  return { Category };
};
