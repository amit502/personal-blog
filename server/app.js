const express = require('express');
const { User } = require('./model');

const app = express();
app.use(express.json());
app.use(cors({origin:'*',credentials:true}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/users', async (req, res, next) => {
    const agents = await User.findAll();
    return res.json(agents);
});

module.exports = app;