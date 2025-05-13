const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

//gerando token jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

//registrando usuario 
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body || {}

    //conferindo campos vazios
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Todos os campos são necessários" })
    }

    // vendo se email existe
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email já está em uso" })
        }

        //criando user
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        })

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({ message: 'Erro registrando usuário', error: err.message })
    }
}

//logando usuario
exports.loginUser = async (req, res) => {
    const { email, password } = req.body || {}
    if (!email || !password) {
        return res.status(400).json({ message: 'Todos os campos são necessários' })
    }
    try {
        const user = await User.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Usuário ou Senha Inválidos' })
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao entrar', error: err.message })
    }
}

// mostrar user
exports.getUserInfo = async (req, res) => {

}