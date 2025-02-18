const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/webp': 'webp'
}

const storage = multer.memoryStorage()

const fileFilter = (req, file, callback) => {
    const isValid = !!MIME_TYPES[file.mimetype]
    if (isValid) {
        callback(null, true)
    } else {
        callback(new Error('Type de fichier invalide. Uniquement jpg, jpeg, png and webp autorisé'))
    }
}

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter 
}).single('image')

const optimizeImage = async (req, res, next) => {
    if (!req.file) {
        return next()
    }

    const name = req.file.originalname.split(' ').join('_').replace(/\.[^/.]+$/, "") 
    const fileName = name + Date.now() + '.webp'
    const filePath = path.join('images', fileName)

    try {
        //convert image to webp using sharp
        await sharp(req.file.buffer)
            .toFormat('webp')
            .toFile(filePath)
        
        req.file.optimizedFileName = fileName
        req.file.optimizedPath = filePath

        next()
    } catch (error) {
        console.error('Erreur:', error)
        res.status(500).send('Failed to process image')
    }
}

module.exports = { upload, optimizeImage }