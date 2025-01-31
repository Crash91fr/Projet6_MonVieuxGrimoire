const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const bookRoutes = require('./routes/book')

const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err))

const app = express()

app.use((req, res,next) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json()) //same as body-parser

app.use('/api/books', bookRoutes)

module.exports = app
