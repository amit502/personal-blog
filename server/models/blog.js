const Sequelize = require('sequelize');
const sequelize = require('./dbConfig');

class Blog extends Sequelize.Model {}

Blog.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        subtitle: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        published: {
            type: Sequelize.BOOLEAN,
            default: false,
        },
    },
    {
        sequelize,
        modelName: 'Blogs',
        // options
    }
);

module.exports = Blog;
