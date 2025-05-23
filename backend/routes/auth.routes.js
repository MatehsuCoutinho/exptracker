const express = require('express')
const { protect } = require('../middleware/auth.middleware')

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require('../controllers/auth.controller')
const upload = require('../middleware/upload.middleware')

const router = express.Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', protect, getUserInfo)

router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Arquivo não enviado' })
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    res.status(200).json({ imageUrl })
})

module.exports = router