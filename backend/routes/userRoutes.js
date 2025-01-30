const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../controllers/userController");
const { upload } = require("../config/multerConfig");

router.route("/signup").post(upload.single("avatar"), registerUser);
router.route("/login").post(authUser);

module.exports = router;
