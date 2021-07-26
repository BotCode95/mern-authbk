const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const validaRoles = require('./validar_roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}