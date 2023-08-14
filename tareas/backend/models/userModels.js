const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please key a Name']
    },
    email: {
        type: String,
        require: [true, 'Please key an eMail'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please key a Password']
    }
},{
    timescamp: true
})

module.exports = mongoose.model('User', userSchema)