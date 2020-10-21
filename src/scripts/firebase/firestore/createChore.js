import { db } from '../firebaseFirestore'
import { collectionPath } from '../firebaseCollections';

const createChore = () => {
	const createChoreBtn = document.getElementById('new-chore-modal-btn')
		
	createChoreBtn.addEventListener('click', () => {
		const modal = document.createElement('div');
		modal.setAttribute('id', 'new-chore-modal')
		modal.innerHTML =
			`<div id="modal-close">
				<svg viewBox="0 0 25 25"><polygon points="25 10.3 14.7 10.3 14.7 0 10.3 0 10.3 10.3 0 10.3 0 14.7 10.3 14.7 10.3 25 14.7 25 14.7 14.7 25 14.7 "/></svg>
			</div>
			<form id="new-chore-form">
				<h2>add a new chore</h2>
				<input id="new-chore-title" type="text" placeholder="Title" required />
				<textarea id="new-chore-desc" placeholder="Description"></textarea>
				<input id="new-chore-date" type="date" placeholder="Date" required />
				<select id="new-chore-priority" required>
					<option value="" disabled selected>Priority</option>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
				<div id="new-chore-btn" class="btn">add new chore</div>
			</form>`

		document.body.append(modal)

		const newChoreBtn = document.getElementById('new-chore-btn')
		newChoreBtn.addEventListener('click', () => {
			const title = document.getElementById('new-chore-title').value
			const desc = document.getElementById('new-chore-desc').value
			const date = document.getElementById('new-chore-date').value
			const priority = document.getElementById('new-chore-priority').value

			// add new chore to database
			db.collection(collectionPath).add({
				title: title,
				desc: desc,
				date: date,
				priority: priority,
				complete: false
			}).catch(function(error) {
				console.error('Error adding document: ', error)
			})
			
			modal.remove()
		})        
	})
}

export { createChore }