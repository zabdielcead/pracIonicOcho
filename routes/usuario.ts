import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import  bcrypt  from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from "../middlewares/autenticacion";



const userRoutes = Router();

//crear un login 
userRoutes.post('/login', ( req: Request, res: Response) =>{
    const body = req.body;

    Usuario.findOne({ email: body.email }, (err, userDB) => {
        if( err ) throw err;

        if( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctas'
            });
        }

        if( userDB.compararPassword(body.password) ) {
            const tokenUser = Token.getJwtTpken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser
            });
        } else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/contraseña no son correctas ****'
            });
        }
    });
});    

// crear un usuario
userRoutes.post('/create', ( req: Request, res: Response) =>{
    // request
    const user = {
        nombre   :  req.body.nombre,
        email    :  req.body.email,
        password :  bcrypt.hashSync(req.body.password, 10),
        avatar   :  req.body.avatar,
    }
    // guardar en base de datos
    Usuario.create(user).then( userDB => {
        
        const tokenUser = Token.getJwtTpken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        })


        /*
        res.json({
            ok: true,
            user: userDB
        })
        */
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

// Actualizar usuario
userRoutes.post('/update', verificaToken ,( req: any, res: Response) =>{

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email   || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar,
    }

    Usuario.findByIdAndUpdate( req.usuario._id, user, {new: true}, (err, userDB) => {
        if(err) throw err;
        if( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            })
        }

       
        const tokenUser = Token.getJwtTpken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });
    
        res.json( {
            ok: true,
            usuario: tokenUser
        } );

    });

});    

export default userRoutes;