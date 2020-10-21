import { firebaseBasics } from './firebaseBasics';
import * as firebase from 'firebase/app';

let userID = '';

const firebaseAuth = new Promise((resolve, reject) => {
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');

    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');

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
    })

    // Sign up with valid email
    signupBtn.addEventListener('click', e => {
        const email = loginEmail.value;
        const pass = loginPassword.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

        document.getElementById('chore-list').innerHTML = ''
    })

    // Logout when authenticated user is logged in
    logoutBtn.addEventListener('click', e => {
        firebase.auth().signOut();
    })

    // Authenticate user on page load
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            logoutBtn.classList.remove('hide');
            loginModal.classList.add('hide');
            loginForm.reset();
            userID = user.uid;
            resolve('logged in');
        } else {
            logoutBtn.classList.add('hide');
            loginModal.classList.remove('hide');
            reject('not logged in');
        }
    })
})

export {
    firebaseAuth,
    userID
}