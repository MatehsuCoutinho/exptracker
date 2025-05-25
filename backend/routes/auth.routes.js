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

router.post('/upload-image', protect, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false,
                message: 'Nenhum arquivo foi enviado' 
            })
        }

        // Em produção no Render.com, use este formato:
        const imageUrl = `/uploads/${req.file.filename}`
        
        res.status(200).json({ 
            success: true,
            imageUrl: imageUrl 
        })
    } catch (error) {
        console.error('Erro no upload:', error)
        res.status(500).json({ 
            success: false,
            message: 'Erro ao processar o upload da imagem',
            error: error.message 
        })
    }
})

module.exports = router