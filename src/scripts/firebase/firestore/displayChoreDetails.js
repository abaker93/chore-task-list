import { tasks } from '../firebaseFirestore'
import { editChore } from './editChore';

// show details of selected chore in a modal
const displayChoreDetails = () => {
    const btns = Array.from(document.getElementsByClassName('chore-details-btn'))

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentID = btn.parentElement.id
            const task = tasks.find(task => task.id == parentID)

            const title = task.title
            const desc = task.desc
            const date = task.date
            const priority = task.priority

            const modal = document.createElement('div')
            modal.setAttribute('id', 'chore-details-modal')
            
            modal.innerHTML =
                `<div id="modal-close">
                    <svg viewBox="0 0 25 25"><polygon points="25 10.3 14.7 10.3 14.7 0 10.3 0 10.3 10.3 0 10.3 0 14.7 10.3 14.7 10.3 25 14.7 25 14.7 14.7 25 14.7 "/></svg>
                </div>
                <div id="${parentID}" class="chore-details">
                    <h2><span>${title}</span> details</h2>
                    <p class="chore-id">id: ${parentID}</p>
                    <h3>Title</h3>
                    <p>${title}</p>
                    <h3>Description</h3>
                    <p>${desc}</p>
                    <h3>Date</h3>
                    <p>${date}</p>
                    <h3>Priority</h3>
                    <p>${priority}</p>
                    <div id="edit-chore-modal-btn" class="btn">edit</div>
                </div>`

            document.body.append(modal)

            const closeBtn = document.getElementById('modal-close');
            closeBtn.addEventListener('click', () => modal.remove())

            const editBtn = document.getElementById('edit-chore-modal-btn')
            editBtn.addEventListener('click', () => editChore())
        })
    })
    editChore()
}

export { displayChoreDetails }