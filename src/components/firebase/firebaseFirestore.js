import { firebaseBasics } from './firebaseBasics';
import { UserID } from './firebaseAuth';
import { buildChoreList } from './firestore/buildChoreList';
import { newChore } from './firestore/newChore';
import { completeChore } from './firestore/completeChore';
import { editChore } from './firestore/editChore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
require("firebase/firestore");

let tasks = [];
let userID = '';
let collectionPath = '';

// Initialize database
const db = firebase.firestore();

// get userID, set collection path
const getCollectionPath = () => {
	userID = UserID;
	collectionPath = userID + '/lists/default';
};

const firebaseFirestore = () => {
	getCollectionPath();
	
	// read tasks from database
	const readTasks = new Promise((resolve, reject) => {
		db.collection(collectionPath)
		.where("title", "!=", null)
		.onSnapshot(querySnapshot => {
			tasks = [];
			querySnapshot.forEach(doc => {
				const id = doc.id;
				const title = doc.data().title;
				const desc = doc.data().desc;
				const date = doc.data().date;
				let priority = doc.data().priority;
				const complete = doc.data().complete;

				if (priority == 'low') {
					priority = '!';
				} else if (priority == 'medium') {
					priority = '!!';
				} else if (priority == 'high') {
					priority = '!!!';
				}

				tasks.push({
					'id': id,
					'title': title,
					'desc': desc,
					'date': date,
					'priority': priority,
					'complete': complete
				});
			});
			if (querySnapshot) {
				resolve('read task list');
			} else {
				reject('couldn\'t read task list');
			}
		});
	})

	readTasks
		.then(buildChoreList)
		.then(newChore)
		.then(editChore);
};

export {
	firebaseFirestore,
	getCollectionPath,
	tasks,
	userID,
	collectionPath,
	db
};
