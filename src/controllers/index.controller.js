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

const getUserById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('select * from users where id = $1',[id]);
    res.json(response.rows);
}

const createUser = async (req, res) => {
    const { name, email } = req.body;
    const response = await pool.query('insert into users (name, email) values ($1, $2)', [name, email]);
    console.log(response);
    res.json({
        message: 'User added succesfuly',
        body: {
            user: {name, email}
        }

    });
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const response = await pool.query('delete from users where id = $1', [id]);
    res.json({
        message: `User ${id} deleted successfully`
    });
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    console.log(id, name, email);
    const response = await pool.query('update users set name = $1, email = $2 where id = $3', 
    [name,email,id]);
    console.log(response);
    res.json({
        menssage: 'User update successfully',
        body: {
            idUserUpdated: {id}
        }
    })
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser
}