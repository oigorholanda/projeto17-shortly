import { db } from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET ?? "NsmiNcjD6yWJvmBX2Whbd1";

export async function createClient(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
      [name, email, hashedPassword]
    );
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(`Erro no banco de dados! ${error.message}`);
  }
}

export async function loginClient(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email=$1;", [
      email,
    ]);

    const hash = user.rows[0]?.password;
    if (!hash) return res.sendStatus(401);

    const validPassword = await bcrypt.compare(password, hash);
    if (!validPassword) return res.sendStatus(401);

    const userId = user.rows[0].id;
    const token = jwt.sign({ userId }, secretKey);
    

    const data = await db.query(
      'INSERT INTO sessions ("userId", token) VALUES ($1, $2) RETURNING id;',
      [userId, token]
    );

    return res.send({ data, token });   
  } catch (error) {
    res.status(500).send(`Erro no banco de dados! ${error.message}`);
  }
}
