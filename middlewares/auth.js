const AsyncWrapper = require("../utils/async-wrapper");
const { UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");
module.exports = auth = AsyncWrapper((req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthorizedError("Unauthorized user!");
	}
	const token = authHeader.split(" ")[1];
	try {
		const decode = jwt.verify(token, process.env.JWT_SECRET);
		const { _id, email, username } = decode;
		req.user = { _id, email, username };
		next();
	} catch (error) {
		throw new UnauthorizedError("Unauthorized user!");
	}
});
