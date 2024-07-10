const express = require('express')
const app = express()
const db = require('./config/database')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT || 3000

app.get('/getActors', db.getActors)
app.get('/getFilmById/:id', db.getFilmById)
app.get('/getEmployees', db.getEmployees)
app.post('/createEmployee', db.createEmployee)

app.listen(port, () => {
    console.log('server is up, port:', port)
})