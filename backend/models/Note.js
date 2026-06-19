const mongoose = require("../db/database").mongoose;
const { Schema, Types } = require("mongoose");

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const NoteModel = mongoose.models.Note || mongoose.model("Note", noteSchema);

async function getNotesByUser(userId) {
    return NoteModel.find({ user: userId }).sort({ createdAt: -1 }).exec();
}

async function getNoteByIdAndUser(noteId, userId) {
    if (!Types.ObjectId.isValid(noteId)) return null;
    return NoteModel.findOne({ _id: noteId, user: userId }).exec();
}

async function createNote(title, content, userId) {
    const note = new NoteModel({ title, content, user: userId });
    await note.save();
    return note;
}

async function updateNote(noteId, title, content, userId) {
    if (!Types.ObjectId.isValid(noteId)) return null;
    return NoteModel.findOneAndUpdate(
        { _id: noteId, user: userId },
        { title, content },
        { new: true }
    ).exec();
}

async function deleteNote(noteId, userId) {
    if (!Types.ObjectId.isValid(noteId)) return 0;
    const result = await NoteModel.deleteOne({ _id: noteId, user: userId }).exec();
    return result.deletedCount || 0;
}

module.exports = {
    getNotesByUser,
    getNoteByIdAndUser,
    createNote,
    updateNote,
    deleteNote,
    NoteModel
};
