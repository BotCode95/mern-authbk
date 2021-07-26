const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT  = async (req, res, next) => {
    const token = req.header('x-token');

    if(!token) {
        return res.json({
            msg: 'no hay token en la petición'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no existe en BD'
            });
        }

        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario estado en false'
            });
        }
        req.usuario = usuario;
        next(); 
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
    console.log(token)

}

module.exports = {
    validarJWT
}