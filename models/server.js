const express = require('express')
const cors = require('cors')
class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT
        this.userPath = '/api/user';

        //middlewares
        this.middlewares();

        this.routes();
    }

    middlewares(){

        this.app.use(cors())
        this.app.use(express.static('public'))
    }

    routes() {
      this.app.use(this.userPath, require('../routes/user.js'))
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Servidor corriento en el puerto ${this.PORT}`)
        })
    }
}

module.exports = Server; 