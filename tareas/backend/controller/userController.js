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
    const { email, password } = req.body
    if(!email || !password){
        res.status(400)
        throw new Error('No debe llevar campos vacios')
    }

    const user = await User.findOne({ email })    

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({ 
            message: 'Login Correct',
            _id: user._id,
            name: user.name,
            password: user.password,
            token: generateSecret(user._id)
        })    
    }else {
        res.status(401).json({ message: 'Incorrect data user'})
    }    
})

const getUSerData = asyncHandler (async (req, res) => {
    res.json( req.user ) 
})

const generateSecret = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '180m'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getUSerData
}
