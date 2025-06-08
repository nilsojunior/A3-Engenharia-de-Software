const Pet = require("../models/Pet");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
    static async create(req, res) {
        const { name, age, weight, breed, gender, size, local } = req.body;

        const images = req.files;

        const available = true;

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        }

        if (!age) {
            res.status(422).json({ message: "A idade é obrigatória!" });
            return;
        }

        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatório!" });
            return;
        }

        if (!breed) {
            res.status(422).json({ message: "A raça é obrigatória!" });
            return;
        }

        if (!gender) {
            res.status(422).json({ message: "O sexo é obrigatório!" });
            return;
        }

        if (!size) {
            res.status(422).json({ message: "O porte é obrigatório!" });
            return;
        }

        if (!local) {
            res.status(422).json({ message: "O local é obrigatório!" });
            return;
        }

        if (images.length === 0) {
            res.status(422).json({ message: "As imagens são obrigatórias!" });
            return;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        const pet = new Pet({
            name,
            age,
            weight,
            breed,
            gender,
            size,
            local,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
                email: user.email,
            },
        });

        images.map((image) => {
            pet.images.push(image.filename);
        });

        try {
            const newPet = await pet.save();
            res.status(201).json({
                message: "Pet cadastrado com sucesso!",
                newPet,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort("-createdAt");

        res.status(200).json({
            pets: pets,
        });
    }

    static async getAllUserPets(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);
        const pets = await Pet.find({ "user._id": user._id }).sort(
            "-createdAt",
        );

        res.status(200).json({ pets });
    }

    static async getAllUserAdoptions(req, res) {
        const token = getToken(req);
        const user = await getUserByToken(token);
        const pets = await Pet.find({ "adopter._id": user._id }).sort(
            "-createdAt",
        );

        res.status(200).json({ pets });
    }

    static async getPetById(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            res.status(422).json({
                message: "ID inválido!",
            });
        }

        const pet = await Pet.findOne({
            _id: id,
        });

        if (!pet) {
            res.status(404).json({
                message: "Pet não encontrado!",
            });
        }

        res.status(200).json({
            pet: pet,
        });
    }

    static async removePetById(req, res) {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            res.status(422).json({
                message: "ID inválido!",
            });
        }

        const pet = await Pet.findOne({
            _id: id,
        });

        //console.log("Pet encontrado:", pet)

        if (!pet) {
            res.status(404).json({
                message: "Pet não encontrado!",
            });
            return;
        }

        const token = getToken(req);
        //console.log('token', token)
        const user = await getUserByToken(token);
        //console.log('user', user)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                message: "Erro! Tente novamente mais tarde!",
            });
            return;
        }

        await Pet.findByIdAndDelete(id);

        res.status(200).json({
            message: "Pet removido!",
        });
    }

    static async updatePet(req, res) {
        //console.log("Token recebido:", req.headers.authorization)
        //console.log("Corpo da requisição antes da verificação:", req.body)

        const id = req.params.id;

        const { name, age, weight, breed, gender, size, local, available } =
            req.body;

        const images = req.files;

        const updatedData = {};

        const pet = await Pet.findOne({
            _id: id,
        });

        if (!pet) {
            res.status(404).json({
                message: "Pet não encontrado!",
            });
            return;
        }

        const token = getToken(req);
        //console.log('token', token)
        const user = await getUserByToken(token);
        //console.log('user', user)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                message: "Erro! Tente novamente mais tarde!",
            });
            return;
        }

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        } else {
            updatedData.name = name;
        }

        if (!age) {
            res.status(422).json({ message: "A idade é obrigatória!" });
            return;
        } else {
            updatedData.age = age;
        }

        if (!weight) {
            res.status(422).json({ message: "O peso é obrigatório!" });
            return;
        } else {
            updatedData.weight = weight;
        }

        if (!breed) {
            res.status(422).json({ message: "A raça é obrigatória!" });
            return;
        } else {
            updatedData.breed = breed;
        }

        if (!gender) {
            res.status(422).json({ message: "O sexo é obrigatório!" });
            return;
        } else {
            updatedData.gender = gender;
        }

        if (!size) {
            res.status(422).json({ message: "O porte é obrigatório!" });
            return;
        } else {
            updatedData.size = size;
        }

        if (!local) {
            res.status(422).json({ message: "O local é obrigatório!" });
            return;
        } else {
            updatedData.local = local;
        }

        if (images.length === 0) {
            res.status(422).json({ message: "As imagens são obrigatórias!" });
            return;
        } else {
            updatedData.images = [];
            images.map((image) => {
                updatedData.images.push(image.filename);
            });
        }

        await Pet.findByIdAndUpdate(id, updatedData);

        res.status(200).json({
            message: "Pet atualizado com sucesso!",
        });
    }

    static async schedule(req, res) {
        const id = req.params.id;

        const pet = await Pet.findOne({
            _id: id,
        });

        if (!pet) {
            res.status(404).json({
                message: "Pet não encontrado!",
            });
            return;
        }

        const token = getToken(req);
        //console.log('token', token)
        const user = await getUserByToken(token);
        //console.log('user', user)

        if (pet.user._id.equals(user._id)) {
            res.status(422).json({
                message:
                    "Você só pode agendar visitas a Pets de outras pessoas",
            });
            return;
        }

        if (pet.adopter) {
            if (pet.adopter._id.equals(user.id)) {
                res.status(422).json({
                    message: "Você já agendou uma visita para este Pet",
                });
                return;
            }
        }

        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image,
        };

        await Pet.findByIdAndUpdate(id, pet);

        // console.log("Dono do pet:", pet.user)

        res.status(200).json({
            message: `Visita agendada! Entre em contato com ${pet.user.name} por meio do telefone ${pet.user.phone} ou pelo e-mail ${pet.user.email}`,
        });
    }

    static async concludeAdoption(req, res) {
        const id = req.params.id;

        const pet = await Pet.findOne({
            _id: id,
        });

        if (!pet) {
            res.status(404).json({
                message: "Pet não encontrado!",
            });
            return;
        }

        const token = getToken(req);
        //console.log('token', token)
        const user = await getUserByToken(token);
        //console.log('user', user)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                message: "Erro! Tente novamente mais tarde!",
            });
            return;
        }

        pet.available = false;

        await Pet.findByIdAndUpdate(id, pet);

        res.status(200).json({
            message: "Adoção finalizada!",
        });
    }
};
