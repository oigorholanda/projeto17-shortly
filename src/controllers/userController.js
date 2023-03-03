import { db } from "../database/database.js";

export async function createClient(req, res) {

    const {name, email, password, confirmPassword} = req.body;

    try {
        const uniqueUser = await db.query(`SELECT * FROM users WHERE email=${email}`)

        if (uniqueUser.rowCount !== 0) return res.status(409).send("Usuário duplicado")

        await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);", [name, email, password])
        res.send(201)
    } catch (error) {
        res.status(500).send(`Erro no banco de dados! ${error.message}`)
    }
}
