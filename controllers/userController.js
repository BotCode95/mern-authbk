const {response} = require('express')

const userGet = (req,res = response) => {
    res.json({
        msg: 'get API - controlador'
    })
}

const userPut = (req,res) => {
    res.json({
        msg: 'put API'
    })
}

const userPost = (req,res) => {
    res.json({
        msg: 'post API'
    })
}

const userDelete = (req,res) => {
    res.json({
        msg: 'delete API'
    })
}


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
}