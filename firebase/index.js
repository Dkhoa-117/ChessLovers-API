let admin = require("firebase-admin");
let serviceAccount = require("../key.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: process.env.DATABASE_URL,
});
const firestore = admin.firestore();
const auth = admin.auth();
module.exports = { firestore, auth };
