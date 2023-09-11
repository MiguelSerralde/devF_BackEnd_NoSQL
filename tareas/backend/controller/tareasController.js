const asyncHandler = require('express-async-handler')
const Tarea = require('../models/modelTareas')

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find({user: req.user._id})
    res.status(500).json(tareas)
})

const postTareas = asyncHandler(async  (req, res) => {
    if(!req.body.Texto){
        res.status(400)
        throw new error('Por favor teclee una descripcion')
    }

    const tareas = await Tarea.create({
        texto: req.body.Texto,
        user: req.user._id
    })
    res.status(500).json(tareas)
})

const putTareas = asyncHandler( async (req, res) => {    
    const tareas = await Tarea.findById(req.params.id)    
    if(!tareas) {
        res.json({message: 'Registro no encontrado'})
    }
    if(tareas.user.toString() !== req.user._id.toString()){
        res.status(402)
        throw new Error('Accesss denied')
    }else{
        const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body.Texto, { new: true })
        res.status(200).json(tareaUpdated)
    }
})

 const deleteTareas =asyncHandler( async(req, res) => {
    const tareas = await Tarea.findById(req.params.id)    
    if(!tareas) {
        res.json({message: 'Registro no encontrado'})
    }
    if(tareas.user.toString() !== req.user._id.toString()){
        res.status(402)
        throw new Error('Accesss denied')
    }else{
        tareas.deleteOne()         
        //const teareDelete = await Tarea.findByAndDelete(req.params.id)
        res.json({ id: req.params.id})
    }
    
    
})

module.exports = {
    getTareas,
    postTareas,
    putTareas,
    deleteTareas
}
