exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(403).send("Need Login");
	}
};

exports.isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		next();
	} else {
		const message = encodeURIComponent("Have Logged In");
		res.redirect(`/?error=${message}`);
	}
};
