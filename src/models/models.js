//

const { Sequelize } = require('sequelize');

const config = require('./../../config/config.json').dev;

const sequelize = new Sequelize(config);

const { User } = require('./user.js')(sequelize);
const { Category } = require('./category.js')(sequelize);
const { Post } = require('./post.js')(sequelize, User, Category);
const { Comment } = require('./comment.js')(sequelize, User, Post);

module.exports = {
    sequelize,
    User,
    Category,
    Post,
    Comment
};
