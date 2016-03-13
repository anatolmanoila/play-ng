var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminUserSchema = new Schema({
        username: String,
        password: String
    });
var adminUser = mongoose.model('adminUser', adminUserSchema);
module.exports = adminUser;