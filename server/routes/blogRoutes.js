const routes = require('express').Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');
const BlogController = require('../controllers/blogController');

routes.get('/', (req, res) => {
    res.send('Blog Section');
});

routes.get('/fetchAllBlogs', isAuthenticated, BlogController.getAllBlogs);
routes.get('/fetchBlogs', BlogController.getBlogs);
routes.post('/createBlog', isAuthenticated, BlogController.createBlog);
routes.put('/updateBlog/:id', isAuthenticated, BlogController.updateBlog);
routes.delete('/deleteBlog/:id', isAuthenticated, BlogController.deleteBlog);

module.exports = routes;
