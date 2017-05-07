let mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    content : String,
    createTime : {
        type:Date,
        default:new Date()
    }
});
