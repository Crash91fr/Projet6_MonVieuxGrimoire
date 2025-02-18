const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

require('dotenv').config()
const mongoUri = process.env.MONGO_URI

const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')

mongoose.connect(mongoUri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(error => console.error("Error connecting to MongoDB:", error))

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use('/api/books', bookRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app
