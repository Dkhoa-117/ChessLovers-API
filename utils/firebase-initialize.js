let admin = require("firebase-admin");
let serviceAccount = require("../key.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.DATABASE_URL,
});
const db = admin.firestore();

module.exports = db;
