const mongoose = require("mongoose");
const validator = require("validator");

const notesSchema = new mongoose.Schema({
  noteId: {
    type: String,
    required: [true, "note_id is must"],
    unique: true,
  },
  noteType: {
    type: String,
    required: [true, "noteType is must"],
  },
  noteName: {
    type: String,
    required: [true, "noteName is must"],
    maxLength: [200, "Note name cannot exceed 69 characters"],
    minLength: [4, "Note name should have more than 4 characters"],
  },
  noteThumbnail: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  noteDownloadableLink: {
    url: {
      type: String,
      required: true,
    },
  },
  cretedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", notesSchema);
