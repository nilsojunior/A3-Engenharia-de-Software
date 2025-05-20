import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
    .promise();

export async function getPets() {
    // Destructuring para pegar somente o primero elemento do array
    const [rows] = await db.query("SELECT * FROM Pet");
    return rows;
}

export async function getNgos() {
    // Destructuring para pegar somente o primero elemento do array
    const [rows] = await db.query("SELECT * FROM NGO");
    return rows;
}

export async function getPet(id) {
    const [rows] = await db.query(
        `SELECT *
    FROM Pet
    WHERE id = ?
    `, // ? Previne que um valor nao confiavel (id) seja enviado diretamente para database
        [id],
    );
    // Retorna apenas o objeto no index 0 ao inves de um array inteiro
    return rows[0];
}

export async function getNgo(id) {
    const [rows] = await db.query(
        `SELECT *
    FROM NGO
    WHERE id = ?
    `, // ? Previne que um valor nao confiavel (id) seja enviado diretamente para database
        [id],
    );
    // Retorna apenas o objeto no index 0 ao inves de um array inteiro
    return rows[0];
}

export async function createPet(petData) {
    const {
        owner_id,
        name,
        species,
        birth_date = null,
        description = null,
    } = petData;

    const [result] = await db.query(
        `INSERT INTO Pet (owner_id, name, species, birth_date, description)
    VALUES (?, ?, ?, ?, ?)`,
        [owner_id, name, species, birth_date, description],
    );

    const id = result.insertId;
    return getPet(id);
}

export async function createNgo(ngoData) {
    const { org_name, email, phone, address } = ngoData;

    const [result] = await db.query(
        `INSERT INTO NGO (org_name, email, phone, address)
    VALUES (?, ?, ?, ?)`,
        [org_name, email, phone, address],
    );

    const id = result.insertId;
    return getNgo(id);
}

// Retorna bool
export async function deletePet(id) {
    const [result] = await db.query(`DELETE FROM Pet WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
        console.log(`No pet found with the ID: ${id}`);
        return false;
    }

    console.log(`Pet with the ID: ${id} has been deleted`);
    return true;
}

// Retorna bool
export async function deleteNgo(id) {
    const [result] = await db.query(`DELETE FROM NGO WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
        console.log(`No NGO found with the ID: ${id}`);
        return false;
    }

    console.log(`NGO with the ID: ${id} has been deleted`);
    return true;
}

// const result = await createPet({
//     owner_id: 1,
//     name: "Bolt",
//     species: "Cachorro",
// });
//
// console.log(result);
