import { db, collectionPath } from './firebase/firebaseFirestore';

const completeChore = () => {
    const btns = Array.from(document.getElementsByClassName('checkbox'));
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement

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