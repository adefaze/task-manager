const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    name: String,
    completed: boolean
})

module.exports = mongoose.model('Task', TaskSchema)