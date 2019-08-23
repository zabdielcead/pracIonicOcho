import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';



const userRoutes = Router();

userRoutes.post('/create', ( req: Request, res: Response) =>{
    // request
    const user = {
        nombre   :  req.body.nombre,
        email    :  req.body.email,
        password :  req.body.password,
        avatar   :  req.body.avatar,
    }
    // guardar en base de datos
    Usuario.create(user).then( userDB => {

        res.json({
            ok: true,
            user: userDB
        })
    }).catch( err => {
        res.json({
            ok: false,
            err
        })
    });

    /*
    res.json({
        ok: true,
        mensaje: 'funciona bien'
    })
    */
});

export default userRoutes;