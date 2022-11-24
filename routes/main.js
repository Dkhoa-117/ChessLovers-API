const router = require("express").Router();
const { GetGame, PlayTheGame } = require("../controllers/game");

router.route("/game/:gameID").get(GetGame).post(PlayTheGame);

module.exports = router;
