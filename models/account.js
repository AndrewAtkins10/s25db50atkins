const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const passportLocalMongoosePlugin = passportLocalMongoose.default || passportLocalMongoose;

const accountSchema = new Schema({
    username: String,
    password: String
});

accountSchema.plugin(passportLocalMongoosePlugin);

module.exports = mongoose.model("Account", accountSchema);