import express, { Router } from "express"
import { getAllNotes, getNoteById, createNote, updateNotes, deleteNotes } from "../controller/notesController.js";

const router = express.Router();

router.get("/", getAllNotes)
router.get("/:id", getNoteById)
router.post("/", createNote)
router.put("/:id", updateNotes)
router.delete("/:id", deleteNotes)

export default router
