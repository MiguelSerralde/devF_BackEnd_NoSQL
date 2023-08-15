const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels') 

const registerUser = asyncHandler( async (req, res) => {
    //Esto es igual a req.body.name, req.body.email, req.body.password
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('No debe llevar campos vacios')
    }
    
    const userExist = await User.findOne({email})    
    if(userExist) {
        res.status(400)
        throw new Error('El correo ya existe')
    }

    //hash password
    const salt = await bcrypt.genSalt(10) //Cantidad de busqueda de numeros aleatorios para el token del password
    const hashPassword = await bcrypt.hash(password, salt) //Concatena la cadena de password y el de Salt

    const user = await User.create({
        name: name,
        email: email,
        password: hashPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: hashPassword            
        })
    } else {
        res.status(400)
        throw new Error('Error al guardar el suaurio')
    }
})

const loginUser = asyncHandler (async (req, res) => {
    res.json({ message: 'Login User'})
})

const getUSerData = asyncHandler (async (req, res) => {
    res.json({ message: 'Data User'})
})

module.exports = {
    registerUser,
    loginUser,
    getUSerData
}
