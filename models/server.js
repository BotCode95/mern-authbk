const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.js');
class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT

        this.userPath = '/api/user';
        this.authPath = '/api/auth';

        this.conectarDB();
        //middlewares
        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){

        this.app.use(cors())

        //parser body
        this.app.use(express.json())
        //directory public
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user.js'))
        this.app.use(this.authPath, require('../routes/auth.js'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriento en el puerto ${this.port}`)
        })
    }
}

module.exports = Server; 