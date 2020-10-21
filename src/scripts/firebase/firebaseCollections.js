import { userID } from './firebaseAuth'
import { db } from './firebaseFirestore'

let listsDirectory = []
let collectionPath = ''
const currentList = 'default'

const getCollectionPath = () => {
	collectionPath = userID + '/lists/' + currentList
}

const getCurrentList = () => {
	const btns = Array.from(document.getElementsByClassName('list-item'))

	btns.forEach(btn => {
		btn.addEventListener('click', () => {
			const parentID = btn.parentElement.id
			const list = listsDirectory.find(list => list.id == parentID)
			console.log(list)
			currentList = list.title
			getCollectionPath()
			console.log(currentList)
			console.log(collectionPath)
		})
	})
}

const displayLists = () => {
	
}

const createList = () => {

}

const firebaseCollections = () => {
	getCollectionPath()
	
	db.collection(userID + '/lists/_lists-directory')
		.onSnapshot(querySnapshot => {
			listsDirectory = []
			querySnapshot.forEach(doc => {	
				listsDirectory.push({
					'id': doc.id,
					'title': doc.data().title
				})
			})
			
			const container = document.getElementById('lists-list')
			container.innerHTML = ''

			for (let i=0; i<listsDirectory.length; i++) {
				const li = document.createElement('li')
				li.setAttribute('id', listsDirectory[i].id)
				li.classList.add('list-item')

				li.innerHTML =
					`<svg class="list-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.3 28"><path fill="#E8CB6C" class="st0" d="M30.2 10.2c-0.4-0.4-0.7-1.2-1.4-0.3 -0.4-0.3-0.8-0.7-1.3-0.4 -0.1 0-0.2 0-0.3 0l-1.1-0.3c-0.5-0.1-0.9-0.4-1.4-0.1 -0.1 0-0.2 0-0.2 0L23 8.8l-2.2-0.3 -0.2-0.2C20.4 8.1 20.1 8 19.8 8l-0.5-0.7 -0.1-0.4c0.4-0.8-0.4-1.2-0.7-1.8l-0.3-0.1 0 0 0 0c0.2-0.7-0.7-0.8-0.8-1.3 0.1-0.4 0-0.7-0.3-1 -0.1-0.2-0.2-0.3-0.5-0.3l-0.2-0.6c0.6-0.6 0-0.7-0.4-0.9 -0.3-0.4-0.3-1.1-1.2-0.9 -0.2 0-0.5-0.1-0.7 0.1 -0.2 0.1-0.4 0.3-0.4 0.5 -0.4 0.5-1.2 0.8-0.8 1.7 -0.7 0.6-0.6 1.5-1.1 2.2 0 0.1 0 0.2-0.1 0.2C11.5 5 11.7 5.6 11.3 6l-0.1 0.5c-0.2 0.1-0.3 0.5-0.2 0.7 -0.4 0.1-0.2 0.6-0.5 0.7 -0.7 0.7-1.6 1-2.6 0.9C7.4 8.7 6.9 8.8 6.4 9l-1 0.3C5.1 9.3 4.7 9.1 4.4 9.3l-0.3 0L2.5 9.6 1.4 9.7c-0.5-0.1-1 0.2-1.2 0.7 -0.5 0.5-0.2 1 0.3 1.3 -0.1 0.3 0.2 0.7 0.5 0.7 0.1 0 0.1 0 0.2 0l0.2 0.2c0.3 0.5 0.7 0.8 1.1 1.1 0.4 0.4 0.9 0.8 1.5 1 0.1 0.4 0.4 0.6 0.7 0.8 0.1 0.4 0.5 0.7 0.9 0.7 0.1 0.3 0.3 0.3 0.5 0.4 0.3 0.4 0.7 0.7 1.2 0.9l0.1 0.8c0 0 0 0.1 0 0.1l0 0c-0.6 0.5-0.8 1.4-0.3 2.1 0.1 0.4-0.5 0.6-0.2 1.1 -0.7 0.7-0.6 1.7-0.7 2.6 0 0.1 0.1 0.2 0.1 0.2l-0.1-0.2c-0.1 0.5-0.4 0.9-0.1 1.4l0.3 0.9c-0.3 0.2-0.9 0.2-0.5 0.7 0.2 0.6 0.8 0.9 1.4 0.7 0.1 0 0.1 0 0.2-0.1 0.5 0.1 1-0.1 1.3-0.6l0.7-0.5 0.5-0.1c0.7 0.1 0.9-0.4 1.3-0.8l0.4-0.2c0.5 0.1 1-0.1 1.3-0.5l0.5-0.7 0.9-0.3c0.9 0.2 0.6-0.5 0.8-0.8l0.6 0.2c0.4 0.5 1 0.5 1.5 0.9 0.5 0.4 1.1 0.7 1.8 0.8 0.1 0.1 0.2 0.2 0.3 0.2 1.1 0.7 2.3 1.4 3.5 1.9l1.5 0.7c0.8 0.1 1.4-0.5 1.5-1.2 0-0.2 0-0.3 0-0.5 0-0.1 0-0.3 0-0.4l-0.4-0.7C25 24.8 25.4 24.3 25 24c0.3-0.5-0.1-0.8-0.3-1.2l0-1c0-0.3-0.1-0.7-0.3-1L24 20.4c0.2-0.2 0.3-0.5 0.2-0.7l-0.1-0.6 -0.2-0.6 0.3-1 0.2-0.6 0.6-0.3c0.4-0.1 0.8-0.2 0.5-0.7 0-0.1 0.1-0.2 0.1-0.2l0.7-0.3c0.3 0 0.6-0.2 0.7-0.5l1.2-1.2c0.4-0.2 0.7-0.5 0.8-0.8 0.5-0.4 1.1-0.7 1.2-1.4C29.9 10.9 30.6 10.6 30.2 10.2zM7.4 20.4L7.4 20.4 7.4 20.4C7.4 20.3 7.4 20.4 7.4 20.4zM7.4 18.5l0-0.1c0 0 0 0 0 0L7.4 18.5 7.4 18.5zM12.3 25L12.3 25C12.3 25 12.3 25 12.3 25 12.3 25 12.3 25 12.3 25zM28.8 10.1C28.8 10 28.8 10 28.8 10.1 28.8 10 28.8 10 28.8 10.1L28.8 10.1z"/></svg>
					<span>${listsDirectory[i].title} chore list</span>
					<svg class="list-details-btn" viewBox="0 0 20 20"><path d="M10,0c1.6,0,2.9,1.3,2.9,2.9S11.6,5.8,10,5.8c-1.6,0-2.9-1.3-2.9-2.9S8.4,0,10,0z M12.9,10c0,1.6-1.3,2.9-2.9,2.9 c-1.6,0-2.9-1.3-2.9-2.9S8.4,7.1,10,7.1C11.6,7.1,12.9,8.4,12.9,10z M10,14.2c1.6,0,2.9,1.3,2.9,2.9c0,1.6-1.3,2.9-2.9,2.9 c-1.6,0-2.9-1.3-2.9-2.9C7.1,15.5,8.4,14.2,10,14.2z"/></svg>`
				container.append(li)	
			}
			getCurrentList()
		})
}

export {
	firebaseCollections,
	getCollectionPath,
	collectionPath
}