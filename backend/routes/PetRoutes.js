// Arquivo de Rotas para Pets
const router = require("express").Router();
const PetController = require("../controllers/PetController");

const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

// Rota para Post
router.post(
    "/create",
    verifyToken,
    imageUpload.array("images"),
    PetController.create,
);

//Rotas para Get
router.get("/", PetController.getAll);
router.get("/mypets", verifyToken, PetController.getAllUserPets);
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);
router.get("/:id", PetController.getPetById);

// Rota para Delete
router.delete("/:id", verifyToken, PetController.deletePetById);

// Rotas para Patch
router.patch(
    "/:id",
    verifyToken,
    imageUpload.array("images"),
    PetController.updatePet,
);
router.patch("/schedule/:id", verifyToken, PetController.schedule);
router.patch("/conclude/:id", verifyToken, PetController.concludeAdoption);

module.exports = router;
