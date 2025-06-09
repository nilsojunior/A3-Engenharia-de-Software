// Arquivo de Rotas para Users

const router = require("express").Router();
const UserController = require("../controllers/UserController");

// Middlewares
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

// Rotas para POST
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Rotas para GET
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);

// Rotas para PATCH
router.patch(
    "/edit/:id",
    verifyToken,
    imageUpload.single("image"),
    UserController.editUser,
);

module.exports = router;
