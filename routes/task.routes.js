const { Router } = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth.middleware');


const router = Router();


//  /api/task + /create
router.post('/create',
    auth,
    async (req,res) => {
    try {
        const { title,text,time } = req.body;

        const task = new Task({
            id: Date.now(),
            title: title,
            text: text,
            time: time,
            owner: req.user.userId
        });

        await task.save().then(console.log('Created new task'));

        res.status(201).json({ task });

    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});


//  /api/task + /tasks
router.get('/tasks',
    auth,
    async (req,res) => {
    try {
        const tasks = await Task.find({ owner: req.user.userId });
        res.json(tasks);
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});


//  /api/task + /:id
router.get('/:id',
    auth,
    async (req,res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (e) {
        res.status(500).json({ message: "Что-то пошло не так" });
    }
});

module.exports = router;