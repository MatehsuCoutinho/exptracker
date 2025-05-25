const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Acesso não autorizado. Por favor, faça login.' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Usuário não encontrado'
            });
        }

        res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
        res.header('Access-Control-Allow-Credentials', 'true');
        
        next();
    } catch (error) {
        console.error('Erro na autenticação:', error.message);
        
        let message = 'Sessão inválida. Por favor, faça login novamente.';
        if (error.name === 'TokenExpiredError') {
            message = 'Sessão expirada. Faça login novamente.';
        } else if (error.name === 'JsonWebTokenError') {
            message = 'Token inválido. Autenticação falhou.';
        }

        res.status(401).json({ 
            success: false,
            message: message
        });
    }
};