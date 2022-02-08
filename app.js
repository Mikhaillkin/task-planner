const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/default.json');

const app = express();
const PORT = config.port ?? 5000;


app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/task', require('./routes/task.routes'));




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
            useUnifiedTopology: true
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