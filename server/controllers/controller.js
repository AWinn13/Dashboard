const ToDoList = require('../model/model')
// You can change the todolist whatever the exam is about like Product or Author

// ctrl f ToDoList and chnage to whatever you weirdo

module.exports.getAll = (req, res) =>{
    ToDoList.find()
        .then((todolist) =>{
            res.json(todolist)
        })
        .catch((err) =>{
            res.status(400).json(err);
        });
}

module.exports.create = (req, res) =>{
    ToDoList.create(req.body)
        .then((todolist) =>{
            res.json(todolist)
        })
        .catch((err) =>{
            res.status(400).json(err);
        });
}


module.exports.update = (req, res) =>{
    ToDoList.findOneAndUpdate({_id: req.params.id}, req.body,{
        new: true,
        runValidators: true
    })
        .then((todolist) =>{
            res.json(todolist)
        })
        .catch((err) =>{
            res.status(400).json(err);
        });
}

module.exports.delete = (req, res) =>{
    ToDoList.deleteOne({_id: req.params.id})
        .then((todolist) =>{
            res.json(todolist)
        })
        .catch((err) =>{
            res.status(400).json(err);
        });
}