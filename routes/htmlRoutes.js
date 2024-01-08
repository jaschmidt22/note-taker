const express = require("express");
const path = require("path");

const router = express.Router();

//route that sends 'notes.html' as response when GET request is made
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
