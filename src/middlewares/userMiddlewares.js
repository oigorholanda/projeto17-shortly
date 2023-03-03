import { userSchema, signinSchema } from "../schemas/userSchema.js";
import { db } from "../database/database.js";

export async function signupValidate(req, res, next){

    const newUser = req.body;
    const {error} = userSchema.validate(newUser, {abortEarly: false});
    
    if(error){
        const errorMessages = error.details.map((obj) => obj.message);
        return res.status(422).send(errorMessages);
    }

    try{
        const {rows} = await db.query('SELECT * FROM users WHERE email=$1;', [newUser.email]);
        if(rows[0]) return res.sendStatus(409);

    }catch(err){
        return res.status(500).send(err.message);

    }
    next();
}

export async function signinValidate(req, res, next){

    const user = req.body;
    const {error} = signinSchema.validate(user, {abortEarly: false});

    if(error){
        const errorMessages = error.details.map((obj) => obj.message);
        return res.status(422).send(errorMessages);
    }

    next()
}