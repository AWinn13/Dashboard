const mongoose = require('mongoose');



const ToDoListSchema = mongoose.Schema({
    task:{
        type: String,
    },
    check_complete:{
        type: Boolean,
    }

}, {timestamps: true});

module.exports = mongoose.model('ToDoList', ToDoListSchema);