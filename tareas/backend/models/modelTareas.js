const mongoose = require('mongoose')

const tareasSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    texto: {
        type: String,
        required: [true, 'Please type a record']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Tarea', tareasSchema)
