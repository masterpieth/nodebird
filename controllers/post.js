const { Post, Hashtag, sequelize } = require("../models");
const PostLike = sequelize.models.PostLike;

exports.afterUploadImage = (req, res) => {
	console.log(req.file);
	res.json({ url: `/img/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
	try {
		const post = await Post.create({
			content: req.body.content,
			img: req.body.url,
			UserId: req.user.id,
		});
		const hashtags = req.body.content.match(/#[^\s#]*/g);
		if (hashtags) {
			const result = await Promise.all(
				hashtags.map((tag) => {
					return Hashtag.findOrCreate({
						where: { title: tag.slice(1).toLowerCase() },
					});
				})
			);
			await post.addHashtags(result.map((r) => r[0]));
		}
		res.redirect("/");
	} catch (err) {
		console.error(err);
		next(err);
	}
};

exports.deletePost = async (req, res, next) => {
	try {
		const result = await Post.destroy({ where: { id: req.params.id } });
		res.json(result);
	} catch (err) {
		console.error(err);
		next(err);
	}
};

exports.likePost = async (req, res, next) => {
	try {
		const result = await PostLike.findOrCreate({
			where: { userId: req.body.userId, postId: req.params.id },
		});
		res.json(result);
	} catch (err) {
		console.error(err);
		next(err);
	}
};

exports.unlikePost = async (req, res, next) => {
	try {
		const result = await PostLike.destroy({
			where: { userId: req.params.userId, postId: req.params.postId },
		});
		res.json(result);
	} catch (err) {
		console.error(err);
		next(err);
	}
};
