const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userDelete, userPut, userPost } = require('../controllers/userController');
const { isRoleValidate, existeEmail, existeUsuarioById } = require('../helpers/db-validators');
const { validarCampos,validarJWT, esAdminRole, tieneRole } = require('../middlewares/');
const Role = require('../models/role');

const router = Router();

router.get('/', userGet)
router.put('/:id', [
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(isRoleValidate),
    validarCampos
], userPut)
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom(isRoleValidate),
    validarCampos
],userPost)
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un Id válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], userDelete)

module.exports = router;