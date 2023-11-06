//

const { Sequelize } = require('sequelize');

const config = require('./../../config/config.json').dev;

const sequelize = new Sequelize(config);

const { User } = require('./user.js')(sequelize);
const { Category } = require('./category.js')(sequelize);
const { Post } = require('./post.js')(sequelize, User);
const { Comment } = require('./comment.js')(sequelize, User, Post);
const { PostHasCategory } = require('./post_has_category.js')(sequelize, Post, Category);

module.exports = {
    sequelize,
    User,
    Category,
    Post,
    Comment,
    PostHasCategory
};
