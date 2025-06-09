// Arquivo para criação de Token de validação de usuários

const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
    // Criando token
    const token = jwt.sign(
        {
            name: user.name,
            id: user.id,
        },
        "secret",
    );

    // Return Token
    res.status(200).json({
        message: "Autenticação realizada com sucesso!",
        token: token,
        userId: user._id,
    });
};

module.exports = createUserToken;
