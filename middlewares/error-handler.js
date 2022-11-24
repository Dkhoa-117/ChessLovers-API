const { CustomError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const ErrorHandler = (error, req, res, next) => {
	console.error(error);
	if (error instanceof CustomError) {
		res.status(error.statusCode).json({ message: error.message });
	} else {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Something went wrong" });
	}
};
module.exports = ErrorHandler;
