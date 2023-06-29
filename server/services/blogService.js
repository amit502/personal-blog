const db = require.main.require('./models');

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await db.Blog.findAll();
        return res.send(blogs);
    } catch (e) {
        return res.sendStatus(500);
    }
};
exports.getBlogs = async (limit, offset, res, req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    try {
        const blogs = await db.Blog.findAndCountAll({
            limit: limit,
            offset: offset,
            where: token && token !== 'undefined' ? {} : { published: true },
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: db.User,
                    attributes: ['firstName', 'lastName', 'email'],
                    required: true,
                },
            ],
        });
        if (offset + limit < blogs.count) {
            blogs['hasNext'] = true;
        } else {
            blogs['hasNext'] = false;
        }
        if (offset > 0) {
            blogs['hasPrev'] = true;
        } else {
            blogs['hasPrev'] = false;
        }
        return res.send(blogs);
    } catch (e) {
        return res.sendStatus(500);
    }
};

exports.createBlog = async (blg, res) => {
    try {
        const blog = await db.Blog.create(blg);
        res.send(blog);
    } catch (e) {
        return res.sendStatus(500);
    }
};

exports.updateBlog = async (blg, id, res) => {
    try {
        let blog = null;
        const updated = await db.Blog.update(blg, {
            where: { id: id },
        });
        if (Array.isArray(updated) && updated.length > 0 && updated[0] == 1) {
            blog = await db.Blog.findOne({ where: { id: id } });
        }
        res.send(blg);
    } catch (e) {
        return res.sendStatus(500);
    }
};

exports.deleteBlog = async (id, res) => {
    try {
        await db.Blog.destroy({ where: { id: id } });
        res.send(200);
    } catch (e) {
        return res.sendStatus(500);
    }
};
