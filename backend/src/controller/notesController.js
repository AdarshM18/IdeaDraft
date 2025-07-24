import Note from "../models/Note.js"
import mongoose from "mongoose"

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1})    // -1 == sort in descending order with respect to date created
        res.status(200).json(notes)
    } catch (error) {
        console.log("Error in getAllNotes controller", error)
        res.status(500).json({message:"Internal server error!"})
    }
}

export async function getNoteById(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid note ID format!" });
        }

        const note = await Note.findById(id);

        if (!note) return res.status(404).json({ message: "Note not found!" });

        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({ message: "Internal server error!" });
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body
        const note = new Note({title, content})

        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.log("Error in createNote controller", error)
        res.status(500).json({message:"Internal server error!"})
    }
}

export async function updateNotes(req, res) {
    const { id } = req.params
    const { title, content } = req.body

    console.log("Incoming PUT request with ID:", id)
    console.log("Payload:", req.body)

    try {
        // Step 1: Check ID validity
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("❌ Invalid ID format")
            return res.status(400).json({ message: "Invalid note ID!" })
        }

        // Step 2: Attempt update
        const updatedNote = await mongoose.model("Note").findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        )

        // Step 3: Handle not found
        if (!updatedNote) {
            console.log("⚠️ Note not found")
            return res.status(404).json({ message: "Note not found!" })
        }

        // Step 4: Success
        console.log("✅ Note updated successfully")
        res.status(200).json(updatedNote)
    } catch (error) {
        // Step 5: Log and return error
        console.error("🔥 Error in updateNotes:", error)
        res.status(500).json({ message: "Internal server error!" })
    }
}



export async function deleteNotes(req, res) {
    try {
        const {id} = req.params
        const {title, content} = req.body

        const deletedNote = await mongoose.model("Note").findByIdAndDelete(id);
        // const deletedNote = await mongoose.model("Note").findByIdAndDelete(
        //     id,
        //     {title, content},
        //     {new:true}
        // )

        if(!deletedNote){
            return res.status(404).json({message:"Note not found, can not delete!"})
        }

        console.log("Note deleted successfully")
        res.status(200).json({ message: "Note deleted successfully!", deletedNote })

    } catch (error) {
        console.error("Error in deleteNotes", error)
        res.status(500).json({message:"Internal server error!" })
    }
}