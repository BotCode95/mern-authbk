const {response} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res= response) => {
    const {correo, password} =req.body;

    try {

        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Email / passsword no son correctos - correo'
            })
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'El usuario se encuentra con estado false'
            })
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'El password es incorrecto'
            })
        }

        //generar jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario, 
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignin = async (req,res) => {

    const {id_token} = req.body;

    
    try {
        const {correo, nombre, img} = await googleVerify(id_token)
    
        let usuario = await Usuario.findOne({correo})
        if(!usuario) {
            //create
            const data = {
                nombre,
                correo,
                password: '123',
                img,
                google: true
            }

            usuario = new Usuario(data)

            await usuario.save()
        }

        //si el usuario en DB 
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario Bloqueado - hable con el administrador'
            })
        }

        //generar jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            msg: 'Token no válido'
        })
    }
  
}


module.exports = {
    login,
    googleSignin
}