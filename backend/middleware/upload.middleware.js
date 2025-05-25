const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração robusta para produção
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Cria o diretório se não existir (caminho absoluto)
        const uploadPath = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Nome do arquivo mais seguro para produção
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // Melhor mensagem de erro
        cb(new Error('Formato de arquivo inválido. Apenas JPEG, JPG e PNG são permitidos.'), false);
    }
};

// Configuração completa do Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 1
    }
});

module.exports = upload;