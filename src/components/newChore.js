import { tasks } from './firebase/firebaseFirestore';

const newChore = (() => {
    const btn = document.getElementById('new-chore-modal-btn');
    const modal = document.getElementById('new-chore-modal');
    const closeBtn = document.getElementById('new-chore-modal-close');

    btn.addEventListener('click', () => {
        modal.classList.remove('hide');
    })

    closeBtn.addEventListener('click', () => {
        const form = document.getElementById('new-chore-form')
        modal.classList.add('hide');
        form.reset();
    })

})();

export { newChore };