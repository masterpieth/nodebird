const { sequelize } = require("../models");
const User = require("../models/user");
const Follow = sequelize.models.Follow;

exports.follow = async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		if (user) {
			await user.addFollowing(parseInt(req.params.id, 10));
			res.send("success");
		} else {
			res.status(404).send("no user");
		}
	} catch (err) {
		console.error(err);
		next(err);
	}
};

exports.unfollow = async (req, res, next) => {
	try {
		const result = await Follow.destroy({ where: { followingId: req.params.id } });
		res.json(result);
	} catch (err) {
		console.error(err);
		next(err);
	}
};

exports.change_nick = async (req, res, next) => {
	try {
		const result = await User.update(
			{
				nick: req.body.nick,
			},
			{
				where: { id: req.params.id },
			}
		);
		res.json(result);
	} catch (err) {
		console.error(err);
		next(err);
	}
};
