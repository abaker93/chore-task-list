import { db, collectionPath } from '../firebaseFirestore';
import { buildChoreList } from './buildChoreList';

const modalBtn = document.getElementById('new-chore-modal-btn');
const modal = document.getElementById('new-chore-modal');
const closeBtn = document.getElementById('new-chore-modal-close');
const form = document.getElementById('new-chore-form');

// open new chore modal
modalBtn.addEventListener('click', () => {
    modal.classList.remove('hide');
})

// close new chore modal and reset form
closeBtn.addEventListener('click', () => {
    modal.classList.add('hide');
    form.reset();
})

// add new chore to database
const newChore = () => {
    document.getElementById('new-chore-btn').addEventListener('click', () => {
        const title = document.getElementById('new-chore-title').value;
        const desc = document.getElementById('new-chore-desc').value;
        const date = document.getElementById('new-chore-date').value;
        const priority = document.getElementById('new-chore-priority').value;
        const modal = document.getElementById('new-chore-modal');

        form.reset();

        // add to database
        db.collection(collectionPath).add({
            title: title,
            desc: desc,
            date: date,
            priority: priority,
            complete: false
        }).then(function() {
            buildChoreList()
        }).catch(function(error) {
            console.error("Error adding document: ", error);
        });
   
        modal.classList.add('hide');
        form.reset();
    });  
}

export { newChore };