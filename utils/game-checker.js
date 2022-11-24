const { Chess } = require("chess.js");

module.exports = {
	gameChecker: (pgn) => {
		let game = new Chess();
		if (game.load(pgn)) {
			if (game.isGameOver()) {
				if (game.isCheckmate()) {
					return game.turn() === "b"
						? "Black is in Checkmate"
						: "White is in Checkmate";
				} else if (game.isStalemate()) {
					return "Look! that's Stalemate";
				}
				return "Game's end in a Draw";
			}
			return "On Going";
		} else {
			throw new Error("Can not load pgn");
		}
	},
	makeAMove: (pgn, m) => {
		let game = new Chess();
		if (game.loadPgn(pgn)) {
			game.move(m);
			return {
				game: game.fen(),
				turn: game.turn(),
				moves: game.pgn(),
			};
		} else {
			throw new Error("Can not load pgn");
		}
	},
};
