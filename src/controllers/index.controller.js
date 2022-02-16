const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB, 
    port: process.env.PORT_DB 
});

const getUsers = async (req, res) => {
    const response = await pool.query('select * from users');
    res.status(200).json(response.rows);
}

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('insert into users (name, email) values ($1, $2)', [name, email]);
    console.log(response);
    res.send('User create')
}

module.exports = {
    getUsers,
    createUser
}