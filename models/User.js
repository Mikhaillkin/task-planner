const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String,required: true },
    password: { type: String, required: true },
    tasks: [{ type: ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Users',userSchema);
