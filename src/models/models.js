//

const { Sequelize } = require('sequelize');

const config = require('./../../config/config.json').dev;

const sequelize = new Sequelize(config);

const { User } = require('./user.js').create(sequelize);
const { Category } = require('./category.js').create(sequelize);
const { Post, Comment } = require('./post.js').create(sequelize);

module.exports = {
    sequelize,
    User,
    Category,
    Post,
    Comment
};
