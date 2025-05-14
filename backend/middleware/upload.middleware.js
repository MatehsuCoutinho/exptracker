const multer = require('multer')

//configurando armazenamento de arquivo c a dependencia multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}=${file.originalname}`)
    },
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(new Error('Apenas os formatos .jpeg, .jpg ou .png são permitidos'), false)
    }
}

const upload = multer({ storage, fileFilter })

module.exports = upload