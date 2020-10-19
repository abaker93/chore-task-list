import {
    db,
    collectionPath,
    tasks
} from '../firebaseFirestore';
import { displayChores } from './displayChores'

const editChore = () => {
    const btn = document.getElementById('edit-chore-modal-btn')

    btn.addEventListener('click', () => {
        console.log('edit chore')

        const parentID = btn.parentElement.id
        const task = tasks.find(task => task.id == parentID)

        const title = task.title
        const desc = task.desc
        const date = task.date

        const detailModal = document.getElementById('chore-details-modal')

        const modal = document.createElement('div')
        modal.setAttribute('id', 'edit-chore-modal')

        modal.innerHTML =
            `<div id="modal-close-2">
                <svg viewBox="0 0 25 25"><polygon points="25 10.3 14.7 10.3 14.7 0 10.3 0 10.3 10.3 0 10.3 0 14.7 10.3 14.7 10.3 25 14.7 25 14.7 14.7 25 14.7 "/></svg>
            </div>
            <form>
                <h2>edit <span>${title}</span></h2>
                <label for="edit-title">Title</label>
                    <input id="edit-title" type="text" placeholder="${title}">
                <label for="edit-desc">Desc</label>
                    <textarea id="edit-desc" placeholder="${desc}"></textarea>
                <label for="edit-date">Date</label>
                    <input id="edit-date" type="date" placeholder="${date}">
                <label for="edit-priority">Priority</label>
                    <select id="edit-priority">
                        <option value="" disabled selected>Select a new priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                <div class="form-buttons">
                    <div id="edit-chore-btn" class="btn">edit chore</div>
                    <div id="remove-edits-btn" class="btn">remove edits</div>
                    <div class="delete-chore-btn">delete chore</div>
                </div>
            </form>`

        document.body.append(modal)

        const editChoreBtn = document.getElementById('edit-chore-btn')
        editChoreBtn.addEventListener('click', () => {
            const newTitle = document.getElementById('edit-title').value;
            const newDesc = document.getElementById('edit-desc').value;
            const newDate = document.getElementById('edit-date').value;
            const newPriority = document.getElementById('edit-priority').value;

            if (newTitle !== '') {
                task.title = newTitle
                db.collection(collectionPath).doc(parentID).update({
                    title: newTitle
                })
            }
            if (newDesc !== '') {
                task.desc = newDesc
                db.collection(collectionPath).doc(parentID).update({
                    desc: newDesc
                })
            }
            if (newDate !== '') {
                task.date = newDate
                db.collection(collectionPath).doc(parentID).update({
                    date: newDate
                })
            }
            if (newPriority !== '') {
                task.priority = newPriority
                db.collection(collectionPath).doc(parentID).update({
                    priority: newPriority
                })
            }

            modal.remove()
            detailModal.remove()
            displayChores()
        })

        const closeBtn = document.getElementById('modal-close-2')
        closeBtn.addEventListener('click', () => {
            modal.remove()
            detailModal.remove()
        })

        const removeEditsBtn = document.getElementById('remove-edits-btn')
        removeEditsBtn.addEventListener('click', () => {
            modal.remove()
            detailModal.remove()
        })
    })    
}

export { editChore }