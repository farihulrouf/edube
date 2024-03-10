require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const con = require('./config/condb');
const app = express();
app.use(cors())
app.use(express.json());

const teachers = require('./routes/teachers')
const students = require('./routes/students')
const users = require('./routes/users')
const contents = require('./routes/contents')
const matpels = require('./routes/matpels')
const jadwals = require('./routes/jadwals')
const attendances = require('./routes/attendances')
const kelas = require('./routes/kelas')
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})
app.use('/kelas', kelas)
app.use('/jadwals', jadwals)
app.use('/teachers', teachers)
app.use('/students', students)
app.use('/users', users)
app.use('/contents', contents)
app.use('/matpels', matpels)
app.use('/attendances', attendances)
//app.use('/users', users)
app.listen(3000, () => {
    //console.log(`Server Started at ${3000}`)
})

module.exports = app