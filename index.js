const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { gameChecker, makeAMove } = require("./utils/game-checker");
const app = express();
const bodyParser = require("body-parser");
var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

app.use(bodyParser.json());
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.DATABASE_URL,
});
const db = admin.firestore();
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
// ? 	{
// ? 	    user: userID,
// ? 	    game: gameID,
// ? 	    move: "d4",
// ? 	}
app.post("/game/:gameID/move", async (req, res) => {
	try {
		const playerData = req.body;
		const chessRef = db.collection("chessgame").doc(req.params.gameID);
		const getDoc = await chessRef.get();
		if (!playerData && !doc.exists) {
			res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad request" });
		}
		let chessgame = getDoc.data();
		const result = makeAMove(chessgame.moves, playerData.move);
		if (result !== "Error") {
			chessgame.game = result.game;
			chessgame.result = gameChecker(result.game);
			chessgame.turn = result.turn;
			chessgame.moves = result.moves;
			await chessRef.set(chessgame);
			res.status(StatusCodes.CREATED).json(chessgame);
		}
	} catch (error) {
		console.error(error);
	}
});

app.get("/game/:gameID", async (req, res) => {
	try {
		const chessRef = db.collection("chessgame").doc(req.params.gameID);
		const getDoc = await chessRef.get();
		if (!getDoc.exists) {
			res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad request" });
		}
		let chessgame = getDoc.data();
		if (chessgame) {
			res.status(StatusCodes.OK).json(chessgame);
		}
	} catch (error) {
		console.error(error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Something went wrong");
	}
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
