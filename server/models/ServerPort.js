var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for data
var ServerPort = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    selectedDay: {
        type: String
    }
},{
    collection: 'servers'
});

module.exports = mongoose.model('ServerPort', ServerPort);