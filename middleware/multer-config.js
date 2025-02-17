const multer = require('multer')

const storage = multer.memoryStorage()

module.exports = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } }).single('image')