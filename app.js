const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()
const mongoUri = process.env.MONGO_URI

const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')

mongoose.connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error))

const app = express()

app.use((req, res,next) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json()) //same as body-parser

app.use('/api/books', bookRoutes)
app.use('/api/auth', userRoutes)

module.exports = app
