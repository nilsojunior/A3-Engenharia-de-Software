const multer = require("multer");

function errorHandler(err, req, res, next) {
    if (
        err instanceof multer.MulterError ||
        err.message.includes("Formatos de arquivos")
    ) {
        return res.status(422).json({ message: err.message });
    }

    return res.status(500).json({ message: "Erro interno no servidor" });
}

module.exports = errorHandler;
