const jwt = require('jsonwebtoken')

//gerando token jwt
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

//registrando usuario 
exports.registerUser = async (req, res) =>{

}

//logando usuario
exports.loginUser = async (req, res) =>{
    
}

// mostrar user
exports.getUserInfo = async (req, res) =>{
    
}