"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var usuario_1 = __importDefault(require("./routes/usuario"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var server = new server_1.default();
console.log('hola mundo!!! cead');
// BodyParser funcion que se ejecuta en nuestra aplicacion
//para preparar la obtencion de los datos en json
//genera request y response
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Rutas de mi app
server.app.use('/user', usuario_1.default);
// conectar con mongo db
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, // trabajar con indeces mongodb y levantar la db
function (err) {
    if (err)
        throw err;
    console.log('BASE DATOS ONLINE');
});
// levantar express
server.start(function () {
    console.log("Servidor corriendo en puerto " + server.port + " ");
});
// tsc -w    : para que escuche los cambios en ts y crea o compila el dist/index.js
// nodemon dist: para que ejecute lo que hay en la carpeta dist
// instalaciones
/*


npm install express              -> servidor web /res
npm install body-parser          -> recibir informacion del servicio rest y pasarlo objeto
npm install cors                 ->
npm install mongoose             -> trabajar con el modelado de datos con node y hacer interacciones con mongo
npm install express-fileupload   -> recibir imagenes y postear
npm install jsonwebtoken         -> autentuicacion de nuestra aplicacion
npm install bcrypt               -> encriotar las contraseñas de nuestros usuarios

npm install @types/express

npm install express body-parser cors mongoose express-fileupload jsonwebtoken bcrypt solo para desarrollo en package,json
 

  npm install @types/mongoose  --save-dev   solo se guaradran para dev depndenciaes para desarrollo
  npm install @types/express   --save-dev


  "devDependencies": {
    "@types/express": "^4.17.1"
  }


*/ 
