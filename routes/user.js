const express = require("express");

const { isLoggedIn } = require("../middlewares");
const { follow, unfollow, change_nick } = require("../controllers/user");

const router = express.Router();

router.post("/:id/follow", isLoggedIn, follow);
router.post("/:id/unfollow", isLoggedIn, unfollow);
router.patch("/:id/nick", isLoggedIn, change_nick);

module.exports = router;
