import jwt from 'jsonwebtoken';

export default class Token {
    private static seed: string = 'este-es-el-sedd-de-mi-app-secreto';
    private static caducidad: string = '30d';

    constructor() {}

    static getJwtTpken( payload: any): string {
            return jwt.sign({
                usuario: payload
            }, this.seed, {expiresIn: this.caducidad});
    }

    static comprobarToken(userToken: string) {
        return new Promise((resolve, reject) => {

            jwt.verify(userToken, this.seed,(err, decoded) => {
                if( err ){
                    // no confiar
                    reject();
                }else{
                    // token valido
                    resolve(decoded); // tendria la info del payload
                }
            } );
        });

    }
}