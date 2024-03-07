require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const con = require('./config/condb');
const app = express();
app.use(cors())
app.use(express.json());

const students = require('./routes/students')
const users = require('./routes/users')
const contents = require('./routes/contents')
const prices = require('./routes/price')
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
})
  

app.use('/students', students)
app.use('/users', users)
app.use('/contents', contents)
app.use('/prices', prices)
//app.use('/users', users)
app.listen(3000, () => {
    //console.log(`Server Started at ${3000}`)
})

module.exports = app