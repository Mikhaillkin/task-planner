const mongoose = require('mongoose');

// const { model } = require('mongoose');

const Schema = mongoose.Schema;
// const model = mongoose.model;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [{ type: ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Users',userSchema);
