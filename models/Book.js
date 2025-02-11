const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    imageUrl: { type: String, required: true},
    year: { type: String, required: true},
    genre: { type: String, required: true},
    rating: [{
        userId: { type: String, required: true},
        grade: { type: Number, required: true}
    }],
    averageRating: { type: Number, default: 0}
})

module.exports = mongoose.model ('Book', bookSchema)