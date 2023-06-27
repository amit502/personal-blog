const BlogService = require('../services/blogService');

exports.getAllBlogs = async (req,res) => {
   return await BlogService.getAllBlogs(req,res);
} 

exports.getBlogs = async (req,res) => {
    const {page,size} = req.query;
    const offset = (page - 1 > 0 ? page - 1 : 0)*size;
    return await BlogService.getBlogs(parseInt(size),offset,res);
 }

 exports.createBlog = async (req,res) => {
    const {body} = req;
    return await BlogService.createBlog(body,res);
 }

 exports.updateBlog = async (req,res) => {
    const {body} = req;
    const {id} = req.params;
    return await BlogService.updateBlog(body,id,res);
 }

 exports.deleteBlog = async (req,res) => {
    const {id} = req.params;
    return await BlogService.deleteBlog(id,res);
 }