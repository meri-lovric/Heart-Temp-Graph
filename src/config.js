import Firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyBujtuelLoEysw0EM9bw89vz3VyS4MgvGY",
	authDomain: "ycblesdkdemo.firebaseapp.com",
	databaseURL: "https://ycblesdkdemo.firebaseio.com",
	projectId: "ycblesdkdemo",
	storageBucket: "ycblesdkdemo.appspot.com",
	messagingSenderId: "446629397754",
	appId: "1:446629397754:web:9599a09164eaf0a5043543",
	measurementId: "G-2SL1VZCLQS",
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
