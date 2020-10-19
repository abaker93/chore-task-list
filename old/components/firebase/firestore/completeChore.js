import { db, collectionPath } from '../firebaseFirestore';

// mark chores as complete or incomplete
const completeChore = () => {
    const btns = Array.from(document.getElementsByClassName('checkbox'));
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement

            // change database
            if (parent.classList.contains('checked')) {
                parent.classList.remove('checked');
                db.collection(collectionPath).doc(parent.id).update({
                    complete: false
                });
            } else {
                parent.classList.add('checked');
                db.collection(collectionPath).doc(parent.id).update({
                    complete: true
                });
            }
        })
    })
};

export { completeChore };