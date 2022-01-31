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


//  /api/task + /delete
router.delete('/delete',
    auth,
    async (req,res) => {
        try {
            console.log(req.body.id);

            await Task.deleteOne({ id:req.body.id }).then(console.log('Запись удалена'));

            // if(!task) {
            //     return res.status(400).json({ message: 'Такой записи нет' });
            // }

            // await task.remove().then(console.log('Запись удалена'));

            res.status(200).json({ message: 'Удаление прошло успешно' });
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
    });


//  /api/task + /done
router.post('/done',
    auth,
    async (req,res) => {
        try {
            console.log(req.body.userIdOwner);

            const task = await Task.findById(req.body.userIdOwner);
            // await Task.deleteOne({ id:req.body.id }).then(console.log('Запись удалена'));


            // if(task && task.done === false) {
            //     task.done = true;
            // } else if (task && task.done === true) {
            //     task.done = false;
            // }

            task && task.done === false ? task.done = true : task.done = false;

            console.log('Updated task: ',task);

            await task.save().then(console.log('Task Updated'));

            // res.status(200).json({ message: "Флаг изменен" });
            res.status(200).json({ task });
        } catch (e) {
            res.status(500).json({ message: "Что-то пошло не так" });
        }
    });

//  /api/task + /taskstate
// router.get('/taskstate',
//     auth,
//     async (req,res) => {
//         try {
//             const task = await Task.findById(req.body.userIdOwner);
//
//             console.log(task);
//
//             res.json(task);
//         } catch (e) {
//             res.status(500).json({ message: "Что-то пошло не так" });
//         }
//     });

module.exports = router;