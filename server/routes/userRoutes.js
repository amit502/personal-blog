const routes = require('express').Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const UserController = require('../controllers/userController');

routes.get('/', (req, res) => {
    res.send('User Section');
});

routes.get('/fetchAllUsers', isAuthenticated, UserController.getAllUsers);
routes.get('/fetchUsers', isAuthenticated, UserController.getUsers);
routes.post('/createUser', isAuthenticated, UserController.createUser);
routes.put('/updateUser/:id', isAuthenticated, UserController.updateUser);
routes.delete('/deleteUser/:id', isAuthenticated, UserController.deleteUser);

module.exports = routes;
