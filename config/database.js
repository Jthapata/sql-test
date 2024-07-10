const { Pool, Connection } = require('pg')

let dbConfig = {
    connectionString: process.env.DB_URL,
    ssl: {rejectUnauthorized: false}
}

const pool = new Pool(dbConfig)

exports.getActors = (req, res) => {
    pool.query('SELECT * FROM actor limit 5', (err, result) => {
        if (err) throw err;
        console.log('getActors')
        for (let row of result.rows) {
            console.log(row);
        }
        res.status(200).json(result.rows)
    })
}

exports.getFilmById = async (req, res) => {
    const id = req.params.id
    const sqlConfig = {
        text: 'SELECT * FROM film WHERE film_id = $1',
        values: [id]
    }
    try {
        const result = await pool.query(sqlConfig)
        if (result.rowCount > 0) {
            res.status(200).json(result.rows)
        } else {
            res.status(200).send('No films with that ID')
        }
    } catch (error) {
        console.log(error)
    }
}

exports.createEmployee = async (req, res) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const sqlConfig = {
        text: 'INSERT INTO employees (first_name, last_name, email) VALUES($1,$2,$3)',
        values: [first_name, last_name, email]
    }
    try {
        const result = await pool.query(sqlConfig)
        console.log(createEmployee)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
    }
}

exports.getEmployees = (req, res) => {
    pool.query('SELECT * FROM employees', (err, result) => {
        if (err) throw err;
        console.log('getEmployees')
        for (let row of result.rows) {
            console.log(row);
        }
        res.status(200).json(result.rows)
    })
}