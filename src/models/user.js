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
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    USERNAME: {
      type: DataTypes.STRING(63),
      allowNull: false,
      unique: true
    },
    EMAIL: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    HASHED_PASSWORD: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    IS_ADMINISTRATOR: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    IS_AUTHOR: {
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
