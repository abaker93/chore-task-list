import {
    db,
    collectionPath,
    tasks
} from '../firebaseFirestore';

const editChore = () => {
    const btns = Array.from(document.getElementsByClassName('menu'));
    const modal = document.getElementById('edit-chore-modal');
    const form = document.getElementById('edit-chore-form');

    const editBtn = document.getElementById('edit-chore-btn');
    const removeBtn = document.getElementById('remove-edits-btn');
    const deleteBtn = document.getElementById('delete-chore-btn');

    const oldTitle = document.getElementById('edit-chore-title-label');
    const oldDesc = document.getElementById('edit-chore-desc-label');
    const oldDate = document.getElementById('edit-chore-date-label');
    const oldPriority = document.getElementById('edit-chore-priority-label');

    form.reset();

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentID = btn.parentElement.id;
            const task = tasks.find(task => task.id == parentID);

            oldTitle.innerText = task.title;
            oldDesc.innerText = task.desc;
            oldDate.innerText = task.date;
            oldPriority.innerText = task.priority;
            modal.classList.remove('hide');

            // commit edits to database on button click
            editBtn.addEventListener('click', () => {
                const newTitle = document.getElementById('edit-chore-title').value;
                const newDesc = document.getElementById('edit-chore-desc').value;
                const newDate = document.getElementById('edit-chore-date').value;
                const newPriority = document.getElementById('edit-chore-priority').value;
                if (newTitle !== '') {
                    task.title = newTitle;
                    db.collection(collectionPath).doc(parentID).update({
                        title: newTitle
                    })
                }
                if (newDesc !== '') {
                    task.desc = newDesc;
                    db.collection(collectionPath).doc(parentID).update({
                        desc: newDesc
                    })
                }
                if (newDate !== '') {
                    task.date = newDate;
                    db.collection(collectionPath).doc(parentID).update({
                        date: newDate
                    })
                }
                if (newPriority !== '') {
                    task.priority = newPriority;
                    db.collection(collectionPath).doc(parentID).update({
                        priority: newPriority
                    })
                }
                modal.classList.add('hide');
                form.reset();
            });
            
            // clear edits and close modal on button click
            removeBtn.addEventListener('click', () => {
                modal.classList.add('hide');
                form.reset();
            });

            // delete chore on button click
            deleteBtn.addEventListener('click', () => {
                const confirmModal = document.createElement('div');
                confirmModal.setAttribute('id', 'confirm-delete-modal');
                confirmModal.setAttribute('class', 'hide');
                confirmModal.innerHTML =
                    `<div>
                        <h2>are you sure?</h2>
                        <div id="confirm-delete" class="btn">yes</div>
                        <div id="reject-delete" class="btn">no</div>
                    </div>`;
                document.body.append(confirmModal);
                confirmModal.classList.remove('hide');

                const confirmDelete = document.getElementById('confirm-delete');
                const rejectDelete = document.getElementById('reject-delete');

                // don't delete
                rejectDelete.addEventListener('click', () => {
                    confirmModal.classList.add('hide');
                })

                // confirm delete
                confirmDelete.addEventListener('click', () => {
                    for (let i=0; i<tasks.length; i++) {
                        if (tasks[i].id == parentID) {
                            tasks.splice(i, 1);
                        }
                    }
                    
                    db.collection(collectionPath).doc(parentID).delete()
                    confirmModal.classList.add('hide');
                    modal.classList.add('hide');
                    form.reset();
                })
            });
        });
    });
};

export { editChore };