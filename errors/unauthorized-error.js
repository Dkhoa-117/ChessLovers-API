const CustomError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");
class UnauthenticatedError extends CustomError {
	constructor(message) {
		this.message = message;
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}
