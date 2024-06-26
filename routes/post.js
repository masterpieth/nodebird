const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { afterUploadImage, uploadPost, deletePost, likePost, unlikePost } = require("../controllers/post");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

if (!fs.existsSync("uploads")) {
	console.error("upload 폴더가 없음. 생성....");
	fs.mkdirSync("uploads");
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, cb) {
			cb(null, "uploads/");
		},
		filename(req, file, cb) {
			const ext = path.extname(file.originalname);
			cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), uploadPost);

router.delete("/:id", isLoggedIn, deletePost);
router.post("/:id/like", isLoggedIn, likePost);
router.delete("/:userId/:postId/unlike", isLoggedIn, unlikePost);

module.exports = router;
