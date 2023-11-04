//

const { DataTypes, Model, Sequelize } = require('sequelize');

class Category extends Model {
}

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
const create = (sequelize) => {
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
    modelName: 'CATEGORY',
    tableName: 'CATEGORY',
    createdAt: false,
    updatedAt: false
  });

  // Test
  Category.sync({ force: true });

  return { Category };
};

module.exports = {
  create,
  Category
};
