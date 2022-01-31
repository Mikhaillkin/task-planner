const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const shortid = require('shortid');


const taskSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, default: '' },
    text: { type: String, required: true, default: '' },
    time: { type: String, default: '' },
    done: { type: Boolean, default: false },
    owner: { type:ObjectId, ref:'Users' }
});

module.exports = mongoose.model('Task',taskSchema);
