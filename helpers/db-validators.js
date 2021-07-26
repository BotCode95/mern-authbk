const Role = require('../models/role')
const Usuario = require('../models/usuario')
const isRoleValidate = async (rol = '') => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const existeEmail = async (correo = '') => {
    const existeMail = await Usuario.findOne({correo});
        if(existeMail) {
          throw new Error(`el correo: ${correo} ya está registrado`)
        }
}

const existeUsuarioById = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
      throw new Error(`El id no existe: ${id}`)
    }
}
module.exports = {
    isRoleValidate,
    existeEmail,
    existeUsuarioById
}