const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const bookCtrl = require('../controllers/book')

router.post('/', auth, multer, bookCtrl.addBook)
router.post('/:id/rating', auth, bookCtrl.rateBook)

router.get('/', bookCtrl.getAllBooks)
router.get('/:id', bookCtrl.getOneBook) 
router.get('/bestrating', bookCtrl.getBestRated)

router.put('/:id', auth, multer, bookCtrl.editBook) 
router.delete('/:id', auth, bookCtrl.deleteBook)

module.exports = router
