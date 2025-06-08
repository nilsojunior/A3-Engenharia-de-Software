const createUserToken = require("../helpers/create-user-token");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmPassword } = req.body;

        // Validacoes

        if (!name) {
            res.status(422).json({ message: "Insira um nome" });
            return;
        }
        if (!email) {
            res.status(422).json({ message: "Insira um email" });
            return;
        }
        if (!phone) {
            res.status(422).json({ message: "Insira um número de telefone" });
            return;
        }
        if (!password) {
            res.status(422).json({ message: "Insira uma senha" });
            return;
        }
        if (!confirmPassword) {
            res.status(422).json({
                message: "Insira a mesma senha na confirmação de senha",
            });
            return;
        }
        if (password !== confirmPassword) {
            res.status(422).json({
                message: "A senha e a confirmação de senha precisam ser iguais",
            });
            return;
        }

        //Verifica a existencia do usuario

        const userCheck = await User.findOne({ email: email });

        if (userCheck) {
            res.status(422).json({ message: "Utilize outro email" });
            return;
        }

        // Criar senha

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Criar user

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        });

        try {
            const newUser = await user.save();

            await createUserToken(newUser, req, res);
        } catch (error) {
            res.status(500).json({
                message: "Erro ao registrar usuário. Tente novamente!",
            });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        if (!email) {
            res.status(422).json({ message: "Insira um email" });
            return;
        }

        if (!password) {
            res.status(422).json({ message: "Insira uma senha" });
            return;
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(422).json({ message: "Usuário não encontrado!" });
            return;
        }

        // Verifica a senha no DB

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            res.status(422).json({
                message: "Usuário não encontrado!",
            });
            return;
        }

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res) {
        let currentUser;

        if (req.headers.authorization) {
            const token = getToken(req);
            const decoded = jwt.verify(token, "secret");

            currentUser = await User.findById(decoded.id);

            currentUser.password = undefined;
        } else {
            currentUser = null;
        }

        res.status(200).send(currentUser);
    }

    static async getUserById(req, res) {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");

        if (!user) {
            res.status(422).json({
                message: "Usuário não encontrado!",
            });
            return;
        }

        res.status(200).json({ user });
    }

    static async editUser(req, res) {
        //console.log("req.body recebido:", req.body);
        //res.send("Verificando req.body...");

        const id = req.params.id;

        const token = getToken(req);

        const user = await getUserByToken(token);

        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (req.file) {
            user.image = req.file.filename;
        }

        if (!name) {
            res.status(422).json({ message: "Insira um nome" });
            return;
        }
        user.name = name;

        if (!email) {
            res.status(422).json({ message: "Insira um email" });
            return;
        }

        user.email = email;

        const userExists = await User.findOne({ email: email });

        if (user.email !== email && userExists) {
            res.status(422).json({
                message: "Por favor, utilize outro email!",
            });
            return;
        }

        if (!phone) {
            res.status(422).json({ message: "Insira um número de telefone" });
            return;
        }

        user.phone = phone;

        if (password !== confirmPassword) {
            res.status(422).json({
                message: "A senha e a confirmação de senha precisam ser iguais",
            });
            return;
        } else if (password === confirmPassword && password != null) {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            user.password = passwordHash;
        }

        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true },
            );

            res.status(200).json({
                message: "Usuário atualizado!",
                data: updatedUser,
            });
        } catch (error) {
            res.status(500).json({ message: error });
            //console.log(error)
            return;
        }
    }
};
