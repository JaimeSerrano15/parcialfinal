const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RodSchema = Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    wood:{
        type: String,
        required: true
    },

    core: {
        type: String,
        required: true
    },

    long: {
        type: Number,
        required: true
    },

    flex: {
        type: Boolean,
        required: true
    }

});

module.exports = mongoose.model('rods', RodSchema);