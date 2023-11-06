//

const { DataTypes, Model, Sequelize } = require('sequelize');

/**
 * 
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize, Post, Category) => {
    class PostHasCategory extends Model {
    }

    PostHasCategory.init({
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Post,
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'PostHasCategory',
        tableName: 'PostHasCategory',
        createdAt: false,
        updatedAt: false
    });

    PostHasCategory.sync();

    return { PostHasCategory };
};
