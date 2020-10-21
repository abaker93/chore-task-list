import {
    db,
    tasks
} from '../firebaseFirestore'
import { collectionPath } from '../firebaseCollections'

const editChore = () => {
    const btn = document.getElementById('edit-chore-modal-btn')

    btn.addEventListener('click', () => {
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
                <p class="chore-id">id: ${parentID}</p>
                <label for="edit-title">Title</label>
                    <input id="edit-title" type="text" value="${title}">
                <label for="edit-desc">Desc</label>
                    <textarea id="edit-desc">${desc}</textarea>
                <label for="edit-date">Date</label>
                    <input id="edit-date" type="date" value="${date}">
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
                    <div id="delete-chore-btn" class="btn">delete chore</div>
                </div>
            </form>`

        document.body.append(modal)

        // Edit chore
        const editChoreBtn = document.getElementById('edit-chore-btn')
        editChoreBtn.addEventListener('click', () => {
            const newTitle = document.getElementById('edit-title').value;
            const newDesc = document.getElementById('edit-desc').value;
            const newDate = document.getElementById('edit-date').value;
            const newPriority = document.getElementById('edit-priority').value;

            if (newTitle !== '') {
                db.collection(collectionPath).doc(parentID).update({
                    title: newTitle
                })
            }
            if (newDesc !== '') {
                db.collection(collectionPath).doc(parentID).update({
                    desc: newDesc
                })
            }
            if (newDate !== '') {
                db.collection(collectionPath).doc(parentID).update({
                    date: newDate
                })
            }
            if (newPriority !== '') {
                db.collection(collectionPath).doc(parentID).update({
                    priority: newPriority
                })
            }

            modal.remove()
            detailModal.remove()
            displayChores()
        })

        // close edit modal and display details modal
        const closeBtn = document.getElementById('modal-close-2')
        closeBtn.addEventListener('click', () => {
            modal.remove()
            detailModal.remove()
        })

        // close edit modal and display details modal
        const removeEditsBtn = document.getElementById('remove-edits-btn')
        removeEditsBtn.addEventListener('click', () => {
            modal.remove()
            detailModal.remove()
        })

        // delete chore, opens confirm/reject modal
        const deleteChoreBtn = document.getElementById('delete-chore-btn')
        deleteChoreBtn.addEventListener('click', () => {
            const confirmModal = document.createElement('div')
            confirmModal.setAttribute('id', 'confirm-delete-modal')
            confirmModal.innerHTML =
                `<div>
                    <h2>are you sure you want to delete <span>${title}</span>?</h2>
                    <p class="chore-id">id: ${parentID}</p>
                    <div id="confirm-delete" class="btn">yes</div>
                    <div id="reject-delete" class="btn">no</div>
                </div>`
            document.body.append(confirmModal)

            const confirmDelete = document.getElementById('confirm-delete')
            const rejectDelete = document.getElementById('reject-delete')

            // don't delete
            rejectDelete.addEventListener('click', () => {
                confirmModal.remove()
            })

            // confirm delete
            confirmDelete.addEventListener('click', () => {
                for (let i=0; i<tasks.length; i++) {
                    if (tasks[i].id == parentID) {
                        tasks.splice(i, 1);
                    }
                }

                db.collection(collectionPath).doc(parentID).delete()
                confirmModal.remove()
                modal.remove()
                detailModal.remove()
                // displayChores()
            })
        })
    })    
}

export { editChore }