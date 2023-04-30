const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const submit = new Schema(
    {
        assCode: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true
        },
        remainings: {
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
const submit_Schema = mongoose.model(
    "submit",
    submit
);
module.exports = submit_Schema;
