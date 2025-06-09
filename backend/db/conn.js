// Conexão e inicialização do DB

const mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://localhost:27017/adoteme");
    console.log("banco de dados conectado com sucesso!");
}

main().catch((err) => console.log(err));

module.exports = mongoose;
