import { FileUpload } from '../interfaces/file-upload';
import path, { dirname } from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    constructor() {

    }

    guardarImagenTemporal ( file: FileUpload, userId: string) {


        return new Promise ( (resolve, reject) =>{

            // crear carpetas
            const path = this.crearCarpetaUsuario(userId);
    
            //nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            console.log('Nombre Archivo=',nombreArchivo);
            // mover el archivo del temp a nuestra carpeta 
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if(err) {
                    // no se pudo mover
                    reject(err);
                }else {
                    // todo salio bien
                    resolve();
                }
            });
        });

    }

    private crearCarpetaUsuario(userID: string) {
        const pathUser = path.resolve(__dirname,'../uploads', userID);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);

        const existe = fs.existsSync(pathUser);

        

        if(!existe){
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;
    }


    private generarNombreUnico(nombreOriginal: string) {
        const nombreArr = nombreOriginal.split('.');
        const ext = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid();
        return `${idUnico}.${ext}`;
    }

    imagenesDeTempHaciaPost ( userId: string ) {
        const patTemp = path.resolve(__dirname,'../uploads', userId, 'temp');
        const pathPost = path.resolve(__dirname,'../uploads', userId, 'posts');

        if(!fs.existsSync(patTemp)) {
            return [];
        }
        if(!fs.existsSync(pathPost)) {
            fs.mkdirSync(pathPost);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp( userId );

        imagenesTemp.forEach( imagen => {
            fs.renameSync(`${patTemp }/${imagen}`, `${pathPost }/${imagen}` );

        });
        return imagenesTemp;
    }

    private obtenerImagenesEnTemp (userId: string) {
        const pathTemp = path.resolve(__dirname,'../uploads', userId, 'temp');
        return fs.readdirSync(pathTemp) || [];
    }

     getFotoUrl( userId:string, img:string) {
        // path posts
        const pathFoto = path.resolve(__dirname,'../uploads', userId, 'posts', img);
        // si la imgen existe
        const existe = fs.existsSync(pathFoto);
        if(!existe){
            return path.resolve(__dirname, '../assets/400x250.jpg')
        }

        return pathFoto;
    }
}