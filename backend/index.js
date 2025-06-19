// Arquivo principal

// Requisição Express e Cors
const express = require("express");
const cors = require("cors");

//Inicialização Express
const app = express();
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Contantes para Rotas de Pets e Users
const UserRoutes = require("./routes/UserRoutes");
const PetRoutes = require("./routes/PetRoutes");
const errorHandler = require('./helpers/error-handler');

//CORS Solução
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    }),
);

// Pasta Publica de imagens
app.use(express.static("public"));

// Rotas
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);
app.use(errorHandler);

app.listen(5000);
