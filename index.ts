import Server from './classes/server';

const server = new Server();
console.log('hola mundo!!! cead');

// levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${server.port} `);
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
 "devDependencies": {
    "@types/express": "^4.17.1"
  }


*/