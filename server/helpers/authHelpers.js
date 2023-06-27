const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
}

exports.generateRefreshToken = (user) => {
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET);
}

exports.refreshTokenDecode = (token) => {
    return jwt.decode(token);
}

exports.accessTokenDecode = (token) => {
    return jwt.decode(token);
}