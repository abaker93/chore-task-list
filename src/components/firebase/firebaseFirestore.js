import { firebaseBasics } from './firebaseBasics';
import { userID } from './firebaseAuth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
require("firebase/firestore");

let tasks = [];

const firebaseFirestore = () => {
	// Initialize database
	var db = firebase.firestore();

	const collectionPath = userID + '/lists/default';

	// add new chore to database
	document.getElementById('new-chore-btn').addEventListener('click', () => {
		const newChoreTitle = document.getElementById('new-chore-title').value;
		const newChoreDesc = document.getElementById('new-chore-desc').value;
		const newChoreDate = document.getElementById('new-chore-date').value;
		const newChorePriority = document.getElementById('new-chore-priority').value;
	
		db.collection(collectionPath).add({
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
	db.collection(collectionPath)
		.where("title", "!=", null)
		.onSnapshot(function(querySnapshot) {
			tasks = [];
			querySnapshot.forEach(function(doc) {
				const title = doc.data().title;
				const desc = doc.data().desc;
				const date = doc.data().date;
				const priority = doc.data().priority;
				const complete = doc.data().complete;
				tasks.push({'title': title, 'desc': desc, 'date': date, 'priority': priority, 'complete': complete});
			});
			buildChoreList();
		});
	
	const buildChoreList = () => {
		const list = document.getElementById('chore-list');
		list.innerHTML = '';
		for(let i=0; i<tasks.length; i++) {
			const li = document.createElement('li');
			li.innerHTML =
				`<span>${tasks[i].title}</span>
				<span>${tasks[i].date}</span>
				<span>${tasks[i].priority}</span>`;
			list.append(li);
		}
	}
};

export { firebaseFirestore };
