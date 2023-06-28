const db = require.main.require('./models');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        return res.send(users);
    } catch (e) {
        return res.sendStatus(500);
    }
};
exports.getUsers = async (limit, offset, res) => {
    try {
        const users = await db.User.findAndCountAll({
            limit: limit,
            offset: offset,
        });
        if (offset + limit < users.count) {
            users['hasNext'] = true;
        } else {
            users['hasNext'] = false;
        }
        if (offset > 0) {
            users['hasPrev'] = true;
        } else {
            users['hasPrev'] = false;
        }
        return res.send(users);
    } catch (e) {
        return res.sendStatus(500);
    }
};

exports.createUser = async (usr, res) => {
    try {
        let usrUpdated = usr;
        usrUpdated.password = bcrypt.hashSync(usr.password, 10);
        const user = await db.User.create(usrUpdated);
        res.send(user);
    } catch (e) {
        return res.sendStatus(500);
    }
};

exports.updateUser = async (usr, id, res) => {
    try {
        let user = null;
        const updated = await db.User.update(usr, {
            where: { id: id },
        });
        if (Array.isArray(updated) && updated.length > 0 && updated[0] == 1) {
            user = await db.User.findOne({ where: { id: id } });
        }
        res.send(user);
    } catch (e) {
        return res.sendStatus(500);
    }
};

exports.deleteUser = async (id, res) => {
    try {
        await db.User.destroy({ where: { id: id } });
        res.send(200);
    } catch (e) {
        return res.sendStatus(500);
    }
};
