const mongoose = require("mongoose");

const costumeSchema = mongoose.Schema({
    costume_type: String,
    size: String,
    cost: { type: Number, min: 0, max: 5000 }
});

module.exports = mongoose.model("Costume", costumeSchema);