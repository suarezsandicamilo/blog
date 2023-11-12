// Defines the user model using Sequelize to interact with data base

const { DataTypes, Model, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {
  /**
   * Represents the User table in data base
   */
  class User extends Model {
  }

  // Configures the User table
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
    modelName: 'User',
    tableName: 'User',
    createdAt: false,
    updatedAt: false
  });

  // Synchronize the model with the data base: creates the table if doesn't
  // exist
  User.sync();

  return { User };
};
