const Controller = require('../controllers/controller');

// ctrl f to change the REAPLCE me's to the doo hickey

module.exports = app =>{
    app.get('/api/tasks', Controller.getAll);
    app.post('/api/tasks', Controller.create);
    app.put('/api/tasks/:id', Controller.update);
    app.delete('/api/tasks/:id', Controller.delete);
};