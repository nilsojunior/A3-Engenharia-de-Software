const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserRoutes = require("./routes/UserRoutes");
const PetRoutes = require("./routes/PetRoutes");

//JSON config

//CORS Solucao
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Pasta Publica de imagens
app.use(express.static("public"));

// Rotas
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

app.listen(5000);
