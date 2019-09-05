import Server from './classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import postRoutes from './routes/post';
import fileUpload from 'express-fileupload';


const server = new Server();
console.log('hola mundo!!! cead');

// BodyParser funcion que se ejecuta en nuestra aplicacion
//para preparar la obtencion de los datos en json
//genera request y response
server.app.use( bodyParser.urlencoded({ extended : true}) ); 
server.app.use( bodyParser.json() );

// fileUpload
server.app.use( fileUpload() );
// por si no sirve  el fileupload la imagen tiene 0 bytes se soluciona con esto
//server.app.use( fileUpload ({useTempFiles:true}));





// Rutas de mi app
server.app.use('/user',userRoutes);
server.app.use('/posts', postRoutes);

// conectar con mongo db
mongoose.connect('mongodb://localhost:27017/fotosgram',
                {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, // trabajar con indeces mongodb y levantar la db
                  ( err ) => {
                    if( err ) throw err;
                    console.log('BASE DATOS ONLINE');
                  }
                );

// levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${server.port} `);
});


/*
para un proyecto simple 
    npm init: el cual genera el package.json
    tsc --init crea el tsconfig.json 
 */

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
 

  npm install @types/mongoose     --save-dev   solo se guaradran para dev depndenciaes para desarrollo
  npm install @types/express      --save-dev
  npm install @types/bcrypt       --save-dev
  npm install @types/jsonwebtoken --save-dev
  npm install @types/express-fileupload --save-dev
   npm install @types/uniqid --save-dev

  "devDependencies": {
    "@types/express": "^4.17.1"
  }


  generar ids unicos 
  npm install uniqid


*/