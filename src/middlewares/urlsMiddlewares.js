import {db} from '../database/database.js';
import {urlSchema} from '../schemas/urlSchema.js';

export function urlValidate(req, res, next){

    const {error} = urlSchema.validate(req.body);
    if(error) return res.status(422).send(error.message);

    next();
}

export async function deleteUrlValidate(req, res, next){

    const {id} = req.params;
    const {userId} = res.locals;

    try{
        const {rows} = await db.query('SELECT "userId" FROM urls WHERE id=$1;', [id]);

        if(!rows[0]) return res.sendStatus(404);
        if(userId !== rows[0].userId) return res.sendStatus(401);

    }catch(err){
        return res.status(500).send(err.message);
    }

    next();
}