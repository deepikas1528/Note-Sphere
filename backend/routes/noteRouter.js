const express = require("express");
const authMiddleware = require("../middleware/verifyUser");
const {
    getAllNotes,
    getSingleNote,
    createNewNote,
    updateExistingNote,
    deleteExistingNote
} = require("../controllers/noteHandler");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllNotes);
router.get("/:id", getSingleNote);
router.post("/", createNewNote);
router.put("/:id", updateExistingNote);
router.delete("/:id", deleteExistingNote);

module.exports = router;
