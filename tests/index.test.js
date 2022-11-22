const request = require("supertest");
const baseURL = "http://localhost:3000";
describe("My first test case", () => {
	test("POST /game/{:gameID}/move", async () => {
		const response = await request(baseURL).post("/game/game00/move").send({
			user: "testingId1",
			game: "game00",
			move: "d4",
		});
		expect(response.status).toEqual(201);
		expect(response.body.moves).toMatch(/1. d4/);
	});
	test("GET /game/{:gameID}", async () => {
		request(baseURL).get("/game/game00").expect(200);
	});
});
