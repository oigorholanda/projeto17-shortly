import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import urlRoutes from "./routers/urlRoutes.js"
import userRoutes from "./routers/userRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use([urlRoutes, userRoutes]);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))