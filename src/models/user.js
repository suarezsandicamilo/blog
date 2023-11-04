//

const { DataTypes, Model, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
  class User extends Model {
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    hashed_password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_administrator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_author: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'USER',
    tableName: 'USER',
    createdAt: false,
    updatedAt: false
  });

  // User.sync();

  // Test
  User.sync({ force: true });

  return { User };
};
