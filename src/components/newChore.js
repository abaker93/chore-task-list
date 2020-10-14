const newChore = (() => {
    const btn = document.getElementById('new-chore-modal-btn');
    const modal = document.getElementById('new-chore-modal');

    btn.addEventListener('click', () => {
        modal.classList.remove('hide');
    })
});

export { newChore };