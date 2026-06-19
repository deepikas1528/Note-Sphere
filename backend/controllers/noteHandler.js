const Note = require("../models/Note");

function formatNoteForClient(note) {
    if (!note) return null;
    return {
        id: note.id || note._id,
        title: note.title,
        content: note.content,
        user_id: note.user ? (note.user.id || note.user) : null,
        created_at: note.createdAt || note.created_at,
        updated_at: note.updatedAt || note.updated_at
    };
}

async function getAllNotes(req, res, next) {
    try {
        const notes = await Note.getNotesByUser(req.user.id);
        const shaped = notes.map(formatNoteForClient);

        res.json({
            success: true,
            count: shaped.length,
            notes: shaped
        });
    } catch (error) {
        next(error);
    }
}

async function getSingleNote(req, res, next) {
    try {
        const note = await Note.getNoteByIdAndUser(req.params.id, req.user.id);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found."
            });
        }

        res.json({
            success: true,
            note: formatNoteForClient(note)
        });
    } catch (error) {
        next(error);
    }
}

async function createNewNote(req, res, next) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required."
            });
        }

        if (title.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: "Title must be at least 3 characters long."
            });
        }

        const note = await Note.createNote(title.trim(), content.trim(), req.user.id);

        res.status(201).json({
            success: true,
            message: "Note created successfully.",
            note: formatNoteForClient(note)
        });
    } catch (error) {
        next(error);
    }
}

async function updateExistingNote(req, res, next) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required."
            });
        }

        const existingNote = await Note.getNoteByIdAndUser(req.params.id, req.user.id);

        if (!existingNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found or you do not have permission to update it."
            });
        }

        const updatedNote = await Note.updateNote(
            req.params.id,
            title.trim(),
            content.trim(),
            req.user.id
        );

        res.json({
            success: true,
            message: "Note updated successfully.",
            note: formatNoteForClient(updatedNote)
        });
    } catch (error) {
        next(error);
    }
}

async function deleteExistingNote(req, res, next) {
    try {
        const deletedRows = await Note.deleteNote(req.params.id, req.user.id);

        if (!deletedRows) {
            return res.status(404).json({
                success: false,
                message: "Note not found or you do not have permission to delete it."
            });
        }

        res.json({
            success: true,
            message: "Note deleted successfully."
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllNotes,
    getSingleNote,
    createNewNote,
    updateExistingNote,
    deleteExistingNote
};
