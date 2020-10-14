import { firebaseBasics } from './firebaseBasics';
import * as firebase from 'firebase/app';
import 'firebase/auth';
require("firebase/firestore");

let userID = '';

const firebaseAuth = new Promise((resolve, reject) => {
	const loginEmail = document.getElementById('login-email');
	const loginPassword = document.getElementById('login-password');
	const loginBtn = document.getElementById('login-btn');
	const signupBtn = document.getElementById('signup-btn');
	const logoutBtn = document.getElementById('logout-btn');
	const loginForm = document.getElementById('login-modal');
	
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
			logoutBtn.classList.remove('hide');
			loginForm.classList.add('hide');
			userID = user.uid;
			resolve('logged in');
		} else {
			logoutBtn.classList.add('hide');
			loginForm.classList.remove('hide');
			reject('logged out');
		}
	});
});

export {
	firebaseAuth,
	userID
};