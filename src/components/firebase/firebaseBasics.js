import * as firebase from 'firebase/app';
import 'firebase/auth';
require("firebase/firestore");

const firebaseBasics = (() => {
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
})();

export { firebaseBasics };