import './styles/styles.scss';
import { setDate } from './components/setDate';
import { asideExpand } from './components/asideExpand';
import * as firebase from 'firebase/app';
import 'firebase/auth';
require("firebase/firestore");

let tasks = [];
let userID;

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
firebase.auth().onAuthStateChanged(user => {
	if(user) {	
		console.log('logged in');
		// userID = user.uid;
		logoutBtn.classList.remove('hide');
	} else {
		console.log('logged out');
		logoutBtn.classList.add('hide');
	}
});

console.log(firebase.auth().currentUser.uid);

var db = firebase.firestore();

// add new chore to database
document.getElementById('new-chore-btn').addEventListener('click', () => {
	const newChoreTitle = document.getElementById('new-chore-title').value;
	const newChoreDesc = document.getElementById('new-chore-desc').value;
	const newChoreDate = document.getElementById('new-chore-date').value;
	const newChorePriority = document.getElementById('new-chore-priority').value;

	db.collection('tasks').add({
		title: newChoreTitle,
		desc: newChoreDesc,
		date: newChoreDate,
		priority: newChorePriority,
		complete: false
	}).catch(function(error) {
		console.error("Error adding document: ", error);
	});
});

// read tasks from database
db.collection(`${userID}/lists/default`)
	.where("title", "!=", null)
	.onSnapshot(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			const title = doc.data().title;
			const desc = doc.data().desc;
			const date = doc.data().date;
			const priority = doc.data().priority;
			const complete = doc.data().complete;
			tasks.push({'title': title, 'desc': desc, 'date': date, 'priority': priority, 'complete': complete});
			console.log(tasks);
		});
	});