const routes = require('express').Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const AuthController = require('../controllers/authController');

routes.get('/', (req, res) => {
    res.send('Auth Section');
});

routes.post('/signUp', AuthController.signUp);
routes.post('/login', AuthController.login);
routes.post('/logout', isAuthenticated, AuthController.logout);
routes.post('/token', AuthController.token);

module.exports = routes;
