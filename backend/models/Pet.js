const { model } = require("mongoose");
const mongoose = require("../db/conn");
const { Schema } = mongoose;

// Schema para Pets no DB
const Pet = mongoose.model(
    "Pet",
    new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            age: {
                type: Number,
                required: true,
            },
            weight: {
                type: Number,
                required: true,
            },
            breed: {
                type: String,
                required: true,
            },
            gender: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: true,
            },
            local: {
                type: String,
                required: true,
            },
            images: {
                type: Array,
                required: true,
            },
            available: {
                type: Boolean,
            },
            user: Object,
            adopter: Object,
        },
        { timestamps: true },
    ),
);

module.exports = Pet;
