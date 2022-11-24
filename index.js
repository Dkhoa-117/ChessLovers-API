const app = require("express")();
const { StatusCodes } = require("http-status-codes");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/error-handler");
const notFoundHandler = require("./middlewares/not-found-handler");
const main = require("./routes/main");
app.use(bodyParser.json());

// * ROUTE
app.use("/api/v1", main);

app.get("/", (req, res) => {
	try {
		res.send("Server is running...");
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: "Something went wrong" });
		console.error(error);
	}
});

// ?	user = {
// ?	 	_id: "testingid1",
// ? 		username: "dkhoa",
// ?		score: 0,
// ?	}
app.post("/start", (req, res) => {
	try {
		const userData = req.user;
		if (!userData) {
			res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad request" });
		}
	} catch (error) {
		console.error(error);
	}
});

// * MIDDLEWARE
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
