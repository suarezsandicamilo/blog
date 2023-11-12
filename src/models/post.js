//

const { DataTypes, Model, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize, User) => {
  class Post extends Model {
  }

  Post.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(63),
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.TEXT
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        through: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: 'Post',
    createdAt: false,
    updatedAt: false
  });

  Post.sync();

  return { Post };
};
