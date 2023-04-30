const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const marksheet = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        }, 
        topic: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const marksheet_Schema = mongoose.model(
    "marksheet",
    marksheet
);
module.exports = marksheet_Schema;
