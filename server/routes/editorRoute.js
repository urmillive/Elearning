const express = require("express");
const router = express.Router();
const editorController = require("../controllers/editorController");

router.post("/editor/submit", editorController.postEditorSubmit);
router.post("/editor/languages", editorController.postEditorLanguage);

module.exports = router;
