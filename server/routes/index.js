const routes = require('express').Router();
const users = require('./userRoutes');
const blogs = require('./blogRoutes');
const auth = require('./authRoutes');

routes.use('/user', users);
routes.use('/blog', blogs);
routes.use('/auth', auth);

module.exports = routes;