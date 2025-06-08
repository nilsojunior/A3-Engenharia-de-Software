const express = require("express");
const cors = require("cors");

const UserRoutes = require("./routes/UserRoutes");
const app = express();

//JSON config
app.use(express.json());

//CORS Solucao
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Pasta Publica de imagens
app.use(express.static("public"));

// Rotas
app.use("/users", UserRoutes);

app.listen(5000);
