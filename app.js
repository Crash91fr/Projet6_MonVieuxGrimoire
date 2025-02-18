const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const path = require('path')

require('dotenv').config()
const mongoUri = process.env.MONGO_URI

const bookRoutes = require('./routes/book')
const userRoutes = require('./routes/user')

mongoose.connect(mongoUri)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(error => console.error("Error connecting to MongoDB:", error))

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization'],
}))

app.use('/api/books', bookRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app
