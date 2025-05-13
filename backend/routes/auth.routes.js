const express = require('express')
const { protect } = require('../middleware/auth.middleware')

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require('../controllers/auth.controller')

const router = express.Router()


router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/getUser', protect, getUserInfo)

module.exports = router