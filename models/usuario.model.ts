import { Schema, model, Document} from 'mongoose';

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [ true, 'El correo es necesario' ]
    },
    password: {
        type: String,
        required: [true, 'la contraseña es requerida']
    }

});

interface IUsuario extends Document{
    nombre: string;
    email: string;
    password: string;
    avatar: string;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema); // model hace las interacciones con la base de datos