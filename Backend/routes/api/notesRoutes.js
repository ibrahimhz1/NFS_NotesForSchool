const express = require("express");
const router = express.Router();

// notes controller
const {
  createNote,
  getAllNotes,
  findNote,
  updateNote,
  deleteNote,
} = require("../../controllers/noteController");

router.route("/note/create").post(createNote);
router.route("/notes").get(getAllNotes);
router.route("/note/search").post(findNote);
router.route("/note/update").patch(updateNote);
router.route("/note/delete").delete(deleteNote);

module.exports = router;
