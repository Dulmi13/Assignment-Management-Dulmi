const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const assigment = new Schema(
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
        des: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
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
const assigment_Schema = mongoose.model(
    "assigment",
    assigment
);
module.exports = assigment_Schema;
