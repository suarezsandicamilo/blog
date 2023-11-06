//

const { DataTypes, Model, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize, User, Post) => {
  class Comment extends Model {
  }

  Comment.init({
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Post,
        key: 'id'
      }
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        through: 'id'
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comment',
    createdAt: false,
    updatedAt: false
  });

  Comment.sync();

  return { Comment };
};
