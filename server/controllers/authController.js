const AuthService = require('../services/authService');

exports.login = async (req, res) => {
    return await AuthService.login(req, res);
};

exports.logout = async (req, res) => {
    return await AuthService.logout(req, res);
};

exports.token = async (req, res) => {
    return await AuthService.token(req, res);
};

exports.signUp = async (req, res) => {
    const { body } = req;
    return await AuthService.signUp(body, res);
};
