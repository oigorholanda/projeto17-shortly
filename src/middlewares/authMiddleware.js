import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

import {db} from '../database/database.js';

const secretKey = process.env.JWT_SECRET ?? 'NsmiNcjD6yWJvmBX2Whbd1';

export default async function authentication(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    try{
       const {id} = jwt.verify(token, secretKey);
       const {rows} = await db.query('SELECT * FROM sessions WHERE id=$1;', [id]);
       const {userId} = rows[0];
       res.locals.userId = userId;

    }catch(err){
        return res.status(401).send(err.message);
    }
    next();
}