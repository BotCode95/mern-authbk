

const esAdminRole = (req,res, next) => {
    if(!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el Token'
        })
    }
    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre } no es Administrador`
        })
    }
    // req.usuario
}

const tieneRole = (...roles) => {
    return (req,res,next) => {
        if(!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el Token'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio require uno de estos roles ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}