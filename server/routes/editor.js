const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editor");

router.post("/submit", editorController.postEditorSubmit);
router.post("/languages", editorController.postEditorLanguage);

module.exports = router;
