const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require.main.require('./models');
const { Op } = require('sequelize');
const AuthHelper = require('../helpers/authHelpers');
const moment = require('moment');

exports.login = async (req, res) => {
    try {
        const user = await db.User.findOne({
            where: { email: req.body.email },
        });
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            let usr = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            };
            const refreshToken = AuthHelper.generateRefreshToken(usr);
            const response = {
                ...usr,
                accessToken: AuthHelper.generateAccessToken(usr),
                refreshToken: refreshToken,
            };
            await db.User.update(
                { refreshToken: refreshToken },
                { where: { id: user.id } }
            );
            return res.send(response);
        } else {
            throw Error;
        }
    } catch (e) {
        return res.sendStatus(401);
    }
};

exports.logout = async (req, res) => {
    try {
        await db.User.update(
            { refreshToken: null },
            { where: { id: req.user.id } }
        );
        return res.sendStatus(204);
    } catch (e) {
        return res.sendStatus(500);
    }
};

exports.token = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (refreshToken == null) return res.sendStatus(401);

        const usr = AuthHelper.refreshTokenDecode(refreshToken);

        const user = await db.User.findOne({ where: { id: usr.id } });

        if (
            AuthHelper.refreshTokenDecode(user.refreshToken)?.id !==
            AuthHelper.refreshTokenDecode(refreshToken)?.id
        )
            return res.sendStatus(403);

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, userr) => {
                if (err) return res.sendStatus(403);

                const accessToken = AuthHelper.generateAccessToken({
                    id: userr.id,
                    firstName: userr.firstName,
                    lastName: userr.lastName,
                    eamil: userr.email,
                });
                res.json({ accessToken: accessToken });
            }
        );
    } catch (e) {
        res.sendStatus(401);
    }
};

exports.signUp = async (data, res) => {
    try {
        const userExists = await db.User.findOne({
            where: { email: { [Op.eq]: data.email } },
        });
        if (userExists) {
            res.status(409);
            return res.json({
                message: 'User already exists! Try using different email.',
            });
        }
        let postData = data;

        postData['joinDate'] = moment().format('YYYY-MM-DD HH:mm:ss');
        postData['password'] = bcrypt.hashSync(data.password, 10);
        await db.User.create(postData);
        return res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);
    }
};
