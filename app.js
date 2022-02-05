const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const multer = require('multer');
const upload = require('./middleware/upload');
const User = require('./models/User');

const config = require('./config/default.json');

const app = express();
const PORT = config.port ?? 5000;


app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/task', require('./routes/task.routes'));
// app.post('/uploadavatar',upload.single('avatar'), async (req,res,next) => {
//     try {
//
//         // const file = req.file;
//         const { email } = req.body;
//
//         const user = await User.findOneAndUpdate({ email: email }, { avatar: req.file.path }, {
//             new: true
//         });
//
//         res.status(201).json( user );
//
//     } catch (e) {
//         res.status(500).json({ message: "Что-то пошло не так" });
//     }
// })
app.use('/uploadavatar', express.static(path.join(__dirname,'/uploadavatar')));



if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

async function start () {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, //добавил
            useFindAndModify: true  //добавил
        })
            .then(console.log('DB Connected'));
        app.listen(
            PORT,
            console.log.bind(console,`Server has been started on port ${PORT}`)
            )
    }
    catch (e) {
        console.log('Server error ',e.message);
        process.exit(1);
    }
}

start();