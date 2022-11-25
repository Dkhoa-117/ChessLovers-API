const jwt = require("jsonwebtoken");

module.exports = {
	generateToken: (_id, email, username) => {
		return jwt.sign({ _id, email, username }, process.env.JWT_SECRET, {
			expiresIn: "1d",
			algorithm: "HS256",
		});
	},
};
