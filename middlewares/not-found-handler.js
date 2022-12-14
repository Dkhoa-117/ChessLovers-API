const { StatusCodes } = require("http-status-codes");
const NotFoundError = (req, res) => {
	res
		.status(StatusCodes.NOT_FOUND)
		.json({ message: `Route '${req.originalUrl}\' not found!` });
};
module.exports = NotFoundError;
