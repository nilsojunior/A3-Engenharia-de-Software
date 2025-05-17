import express from "express";

import { getPet, getPets, createPet } from "./database.js";

const app = express();
app.use(express.json());

app.get("/pet", async (req, res) => {
    const pets = await getPets();
    res.send(pets);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
