const Book = require('../models/Book')

exports.getAllBooks = (req, res, next) => { 
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }))
}

exports.getOneBook = (req, res, next) => { 
    Book.findOne({_id: req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }))
}

exports.getBestRated = (req, res, next) => {
    Book.find().sort()({averageRating: -1}).limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }))
}

exports.addBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id
    delete bookObject._userId

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
    }

    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    
    book.save()
        .then(() => res.status(201).json({ message: "livre ajouté" }))
        .catch(error => {
            console.error("Erreur lors l'ajout du livre :", error);
            res.status(500).json({ error: error.message });
        })
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
    const bookId = req.params.bookId  
    const { userId, grade } = req.body

  Book.findById(bookId)
    .then(book => {
      book.rating.push({ userId, grade });

      // Recalculate averageRating
      const totalRating = book.rating.reduce((sum, rating) => sum + rating.grade, 0)
      book.averageRating = totalRating / book.rating.length

      return book.save()
    })
    .then(() => res.status(200).json({ message: 'Rating added and average updated!' }))
    .catch(error => res.status(400).json({ error }));
}  


