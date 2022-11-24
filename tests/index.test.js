const request = require("supertest");
const baseURL = "http://localhost:3000/api/v1";
describe("ROUTE TEST 🧪", () => {
	test("GET /game/{:gameID}", async () => {
		await request(baseURL).get("/game/game00").expect(200);
	});
	test("POST /game/{:gameID}", async () => {
		const response = await request(baseURL).post("/game/game00").send({
			user: "testingId1",
			game: "game00",
			move: "d4",
		});
		expect(response.status).toEqual(201);
		expect(response.body.moves).toMatch(/1. d4/);
	});
});

describe("MIDDLEWARE TEST 🧪", () => {
	test("test Not Found Handler", async () => {
		await request(baseURL).get("/notaroute").expect(404);
	});
	test("test Error Handler", async () => {
		const response = await request(baseURL).post("/game/game00_error").send({
			user: "testingId1",
			game: "game00",
			move: "d5",
		});
		expect(response.status).toEqual(500);
		expect(response.body.message).toEqual("Something went wrong");
	});
});
