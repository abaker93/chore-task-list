import './styles/styles.scss';
import { setDate } from './components/setDate';
import * as firebase from 'firebase/app';
import 'firebase/auth';
// const firebase = require("firebase");
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyB9pOAZ9wO36faWaaXC5V3yBeGRjEdChGw",
	authDomain: "chores-task-list.firebaseapp.com",
	databaseURL: "https://chores-task-list.firebaseio.com",
	projectId: "chores-task-list",
	storageBucket: "chores-task-list.appspot.com",
	messagingSenderId: "514159857211",
	appId: "1:514159857211:web:509bbe245173e56ee5961e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');

// Login authenticated users
loginBtn.addEventListener('click', e => {
	const email = loginEmail.value;
	const pass = loginPassword.value;
	const auth = firebase.auth();

	const promise = auth.signInWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
});

// Sign up with valid email
signupBtn.addEventListener('click', e => {
	const email = loginEmail.value;
	const pass = loginPassword.value;
	const auth = firebase.auth();

	const promise = auth.createUserWithEmailAndPassword(email, pass);
	promise.catch(e => console.log(e.message));
});

// Logout when authenticated user is logged in
logoutBtn.addEventListener('click', e => {
	firebase.auth().signOut();
});

// authenticate user
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser) {
		console.log('logged in');
		logoutBtn.classList.remove('hide');
	} else {
		console.log('logged out');
		logoutBtn.classList.add('hide');
	}
});

var db = firebase.firestore();

document.getElementById('new-chore-btn').addEventListener('click', () => {
	const newChoreTitle = document.getElementById('new-chore-title').value;
	const newChoreDesc = document.getElementById('new-chore-desc').value;
	const newChoreDate = document.getElementById('new-chore-date').value;
	const newChorePriority = document.getElementById('new-chore-priority').value;

	// console.log(newChoreTitle, newChoreDesc, newChoreDate, newChorePriority)

	db.collection('tasks').add({
		title: newChoreTitle,
		desc: newChoreDesc,
		date: newChoreDate,
		priority: newChorePriority
	})
	.then(function(docRef) {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch(function(error) {
		console.error("Error adding document: ", error);
	});
});