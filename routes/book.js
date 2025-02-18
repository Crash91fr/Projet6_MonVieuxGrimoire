const express = require('express')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

const router = express.Router()

const bookCtrl = require('../controllers/book')

router.post('/', auth, multer, bookCtrl.addBook)
router.post('/:id/rating', auth, bookCtrl.rateBook)
router.get('/bestrating', bookCtrl.getBestRated)
router.get('/:id', bookCtrl.getOneBook) 
router.get('/', bookCtrl.getAllBooks)
router.put('/:id', auth, multer, bookCtrl.editBook) 
router.delete('/:id', auth, bookCtrl.deleteBook)

module.exports = router
