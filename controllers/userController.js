const {response} = require('express')
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const userGet = async (req,res = response) => {
    const {limite = 20, desde = 0} = req.query;
    const query = {estado : true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({total, usuarios})
}

const userPost = async (req,res) => {
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)
    //save in db

    await usuario.save()
    res.json({
        msg: 'post API',
        usuario
    })
}

const userPut = async (req,res) => {
    const id = req.params.id;
    const {_id, password, google, ...resto} = req.body;
    
    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json({usuario})
}



const userDelete = async (req,res) => {
    const id = req.params.id;
    const usuarioAutenticado = req.usuario;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    // res.json({usuario, uid})
    res.json({usuario, usuarioAutenticado})
}


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
}