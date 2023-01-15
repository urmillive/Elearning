const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },
    lastName: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    purchases: {
        type: Array,
        default: []
    },
    enrollments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enrollment"
        }
    ],
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
