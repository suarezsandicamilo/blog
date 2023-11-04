//

const { DataTypes, Model, Sequelize } = require('sequelize');

class Post extends Model {
}

class Comment extends Model {
}

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
const create = (sequelize) => {
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
      type: DataTypes.BLOB
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'POST',
    tableName: 'POST',
    createdAt: false,
    updatedAt: false
  });

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
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'COMMENT',
    tableName: 'COMMENT',
    createdAt: false,
    updatedAt: false
  });

  Post.hasMany(Comment);
  Comment.belongsTo(Post);

  // Test
  Post.sync({ force: true });
  Comment.sync({ force: true });

  return { Post, Comment };
};

module.exports = {
  create,
  Post,
  Comment
};
