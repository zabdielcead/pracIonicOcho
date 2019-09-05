"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() {
    }
    guardarImagenTemporal(file, userId) {
        return new Promise((resolve, reject) => {
            // crear carpetas
            const path = this.crearCarpetaUsuario(userId);
            //nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            console.log('Nombre Archivo=', nombreArchivo);
            // mover el archivo del temp a nuestra carpeta 
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    // no se pudo mover
                    reject(err);
                }
                else {
                    // todo salio bien
                    resolve();
                }
            });
        });
    }
    crearCarpetaUsuario(userID) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads', userID);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split('.');
        const ext = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid_1.default();
        return `${idUnico}.${ext}`;
    }
    imagenesDeTempHaciaPost(userId) {
        const patTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        const pathPost = path_1.default.resolve(__dirname, '../uploads', userId, 'posts');
        if (!fs_1.default.existsSync(patTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${patTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrl(userId, img) {
        // path posts
        const pathFoto = path_1.default.resolve(__dirname, '../uploads', userId, 'posts', img);
        // si la imgen existe
        const existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathFoto;
    }
}
exports.default = FileSystem;
