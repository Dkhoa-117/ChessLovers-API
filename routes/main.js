const router = require("express").Router();
const { GetGame, PlayTheGame } = require("../controllers/game");

// * /home
router.route("/home").get((req, res) => {
	res.render("index", {
		title: "Chess Lovers API",
		message: "Server is running!",
	});
});

// * /game/:gameID
router.route("/game/:gameID").get(GetGame).post(PlayTheGame);

module.exports = router;
