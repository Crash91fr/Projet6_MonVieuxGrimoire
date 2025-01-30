const express = require('express')

const app = express()

app.use((req, res) => {
    res.json({ message: 'votre requête a bien été recue par le serveur'})
})

module.exports = app
