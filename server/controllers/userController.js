const UserService = require('../services/userService');

exports.getAllUsers = async (req,res) => {
   return await UserService.getAllUsers(req,res);
} 

exports.getUsers = async (req,res) => {
    const {page,size} = req.query;
    const offset = (page - 1 > 0 ? page - 1 : 0)*size;
    return await UserService.getUsers(parseInt(size),offset,res);
 }

 exports.createUser = async (req,res) => {
    const {body} = req;
    return await UserService.createUser(body,res);
 }

 exports.updateUser = async (req,res) => {
    const {body} = req;
    const {id} = req.params;
    return await UserService.updateUser(body,id,res);
 }

 exports.deleteUser = async (req,res) => {
    const {id} = req.params;
    return await UserService.deleteUser(id,res);
 }