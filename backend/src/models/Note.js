import mongoose, { Schema } from "mongoose";

// 1. create a scheme
// 2. create a model based off of that schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },
    {timestamps: true}   // by default it will give createdAt, updatedAt
)

const Note = mongoose.model("Note", noteSchema)

export default Note