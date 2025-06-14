const { model } = require("mongoose");
const mongoose = require("../db/conn");
const { Schema } = mongoose;

// Schema para Users no DB
const User = mongoose.model(
    "User",
    new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            image: {
                type: String,
            },
            phone: {
                type: String,
                required: true,
            },
        },
        { timestamps: true },
    ),
);

module.exports = User;
