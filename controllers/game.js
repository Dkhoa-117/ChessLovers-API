const db = require("../utils/firebase-initialize");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { gameChecker, makeAMove } = require("../utils/game-checker");
const asyncWrapper = require("../middlewares/async-wrapper");

module.exports = {
	PlayTheGame: asyncWrapper(async (req, res) => {
		// ? 	{
		// ? 	    user: userID,
		// ? 	    game: gameID,
		// ? 	    move: "d4",
		// ? 	}
		const playerData = req.body;
		const chessRef = db.collection("chessgame").doc(req.params.gameID);
		const getDoc = await chessRef.get();
		if (!playerData && !getDoc.exists) {
			throw new BadRequestError("Bad Request!");
		}
		let chessgame = getDoc.data();
		const result = makeAMove(chessgame.moves, playerData.move);

		chessgame = {
			game: result.game,
			result: gameChecker(result.game),
			turn: result.turn,
			moves: result.moves,
		};
		await chessRef.set(chessgame);
		chessRef.set(chessgame);
		res.status(StatusCodes.CREATED).json(chessgame);
	}),
	GetGame: asyncWrapper(async (req, res) => {
		const chessRef = db.collection("chessgame").doc(req.params.gameID);
		const getDoc = await chessRef.get();
		if (!getDoc.exists) {
			throw new BadRequestError("Bad Request!");
		}
		let chessgame = getDoc.data();
		if (chessgame) {
			res.status(StatusCodes.OK).json(chessgame);
		}
	}),
};
