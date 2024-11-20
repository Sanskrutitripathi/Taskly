const express = require('express');
const router = express.Router();
const controller = require('./controller');

console.log("in task route")
router.post('/newdata', controller.createTask);
router.get('/getdata', controller.getAllTasks);
router.get('/getdataById/:id', controller.getTaskById);
router.delete('/deletetask/:id', controller.deleteTask);
router.put('/updatetask/:id', controller.updateTask);

module.exports = router;

