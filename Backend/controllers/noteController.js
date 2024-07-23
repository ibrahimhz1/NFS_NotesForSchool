const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Notes model
const notesModel = require("../models/notesModel");

exports.createNote = catchAsyncErrors(async (req, res, next) => {
  const { noteId, noteType, noteName, noteThumbnail, noteDownloadableLink } =
    req.body;
  const note = await notesModel.create({
    noteId,
    noteType,
    noteName,
    noteThumbnail,
    noteDownloadableLink,
  });
  if (!note) return res.status(400).json({ message: "No Note is created" });
  res.status(200).json({
    success: true,
    note,
  });
});

exports.getAllNotes = catchAsyncErrors(async (req, res, next) => {
  const notes = await notesModel.find();
  if (!notes || !notes.length)
    return res.status(400).json({ message: "No Notes Created yet" });
  res.status(200).json({
    success: true,
    notes,
  });
});

exports.findNote = catchAsyncErrors(async (req, res, next) => {
  const { noteId } = req.body;
  const note = await notesModel.find({ noteId });
  if (!note)
    return res.status(400).json({ message: "No Note found by this ID" });
  res.status(200).json({
    success: true,
    note,
  });
});

exports.updateNote = catchAsyncErrors(async (req, res, next) => {
  const { noteId, noteName, noteType, noteThumbnail, noteDownloadableLink } =
    req.body;
  const note = await notesModel.updateOne(
    { noteId },
    { $set: { noteName, noteType, noteThumbnail, noteDownloadableLink } },
  );
  if (!note)
    return res
      .status(400)
      .json({ message: "Update failed due to wrong credentials" });
  res.status(200).json({
    success: true,
    note,
  });
});

exports.deleteNote = catchAsyncErrors(async (req, res, next) => {
  const { noteId } = req.body;
  const note = await notesModel.deleteOne({ noteId });
  if (!note) return res.status(400).json({ message: "No Notes Deleted" });
  res.status(200).json({
    success: true,
    message: "Notes Deleted",
  });
});
