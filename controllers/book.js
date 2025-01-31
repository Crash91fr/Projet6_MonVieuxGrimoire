const Book = require('../models/Book')

exports.getAllBooks = (req, res, next) => { 
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }))
}

exports.getOneBook = (req, res, next) => { 
    Book.findOne()({_id: req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }))
}

exports.getBestRated = (req, res, next) => {
    Book.sort()({averageRating: -1})
    Book.limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }))
}

exports.addBook = (req, res, next) => {
    delete req.body._id
    const book = new Book({
      ...req.body  
    })
    book.save()
    .then(() => res.status(201).json({ message: "livre ajouté"}))
    .catch(error => res.status(400).json({ error }))
}

exports.editBook = (req, res, next) => {
    Book.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({ message: "livre modifié"}))
    .catch(error => res.status(400).json({ error }))
}

exports.deleteBook = (req, res, next) => {
    Book.deleteOne({_id: req.params.id})
    .then(() => res.status(200).json({ message: "livre supprimé"}))
    .catch(error => res.status(400).json({ error }))
}

exports.rateBook = (req, res, next) => {
    console.log("évaluation ajoutée")    
}

