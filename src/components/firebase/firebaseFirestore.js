import { firebaseBasics } from './firebaseBasics';
import { userID } from './firebaseAuth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
require("firebase/firestore");

let tasks = [];

// Initialize database
const db = firebase.firestore();

const firebaseFirestore = () => {
	const collectionPath = userID + '/lists/default';
	
	// add new chore to database
	document.getElementById('new-chore-btn').addEventListener('click', () => {
		const newChoreTitle = document.getElementById('new-chore-title').value;
		const newChoreDesc = document.getElementById('new-chore-desc').value;
		const newChoreDate = document.getElementById('new-chore-date').value;
		const newChorePriority = document.getElementById('new-chore-priority').value;
		const modal = document.getElementById('new-chore-modal');

		db.collection(collectionPath).add({
			title: newChoreTitle,
			desc: newChoreDesc,
			date: newChoreDate,
			priority: newChorePriority,
			complete: false
		}).catch(function(error) {
			console.error("Error adding document: ", error);
		});

		modal.classList.add('hide');
	});
	
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

				tasks.push({'id': id, 'title': title, 'desc': desc, 'date': date, 'priority': priority, 'complete': complete});
			});
			if (querySnapshot) {
				resolve('read task list');
			} else {
				reject('couldn\'t read task');
			}
		});
	})
	
	

	const buildChoreList = () => {
		const list = document.getElementById('chore-list');
		list.innerHTML = '';
		for(let i=0; i<tasks.length; i++) {
			const li = document.createElement('li');
			li.classList.add('chore-item');
			li.setAttribute('id', tasks[i].id);

			if(tasks[i].complete) {
				li.classList.add('checked');
			} else if (tasks[i].complete == false) {
				li.classList.remove('checked');
			}

			li.innerHTML =
				`<svg class="checkbox" viewBox="0 0 20 20"><path d="M0,0v20h20V0H0z M19,19H1V1h18V19z"/><path class="check" d="M5.7,15.8c0.6,0.8,1.7,1,2.4,0.4c0.2-0.2,0.4-0.4,0.5-0.6l0,0c0,0,0,0,0,0c0-0.1,0.1-0.1,0.1-0.2c0.6-1.4,4-8.3,8.7-11.9 c0,0-5.9,0.2-10.4,8.2L5.4,9.3c-0.6-0.8-3.4,1.2-2.9,2L5.7,15.8z"/></svg>
				<span class="title">${tasks[i].title}</span>
				<span class="date">${tasks[i].date}</span>
				<span class="priority">${tasks[i].priority}</span>
				<svg class="menu" viewBox="0 0 20 20"><path d="M10,0c1.6,0,2.9,1.3,2.9,2.9S11.6,5.8,10,5.8c-1.6,0-2.9-1.3-2.9-2.9S8.4,0,10,0z M12.9,10c0,1.6-1.3,2.9-2.9,2.9 c-1.6,0-2.9-1.3-2.9-2.9S8.4,7.1,10,7.1C11.6,7.1,12.9,8.4,12.9,10z M10,14.2c1.6,0,2.9,1.3,2.9,2.9c0,1.6-1.3,2.9-2.9,2.9 c-1.6,0-2.9-1.3-2.9-2.9C7.1,15.5,8.4,14.2,10,14.2z"/></svg>`;
			list.append(li);
		}
	}

	const completeChore = () => {
		const btns = Array.from(document.getElementsByClassName('checkbox'));
		btns.forEach(btn => {
			btn.addEventListener('click', () => {
				const parent = btn.parentElement

				if (parent.classList.contains('checked')) {
					parent.classList.remove('checked');
					console.log(parent.id);
					db.collection(collectionPath).doc(parent.id).set({
						complete: false
					}, { merge: true });
				} else {
					parent.classList.add('checked');
					db.collection(collectionPath).doc(parent.id).set({
						complete: true
					}, { merge: true });
				}
				
			})
		})
	};

	readTasks.then(buildChoreList).then(completeChore);
};

export { firebaseFirestore };
