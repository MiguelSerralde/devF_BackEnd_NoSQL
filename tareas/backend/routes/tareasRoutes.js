const express = require('express')
const router = express.Router()
const { getTareas, postTareas, putTareas, deleteTareas } = require('../controller/tareasController')
const { protect } = require('../middleware/authMiddleware')

//Simplificando las lineas de codigo router.get & router..post
router.route('/').get(protect, getTareas).post(protect, postTareas) 
//router.get('/', getTareas)
//router.post('/', postTareas)

//Simplificando las lineas de codigo router.put & router.delete
router.route('/:id').put(protect, putTareas).delete(protect, deleteTareas)
//router.put('/:id', putTareas)
//router.delete('/:id', deleteTareas)

module.exports = router