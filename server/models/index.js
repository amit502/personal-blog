const User = require('./user');
const Blog = require('./blog');
const sequelize = require('./dbConfig');

User.hasMany(Blog);
Blog.belongsTo(User);

module.exports = {
    User,
    Blog,
    sequelize
}