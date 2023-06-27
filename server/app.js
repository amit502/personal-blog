const express = require('express');
const { User } = require('./model');

const app = express();
app.use(express.json());

app.get('/users', async (req, res, next) => {
    const agents = await User.findAll();
    return res.json(agents);
});

module.exports = app;