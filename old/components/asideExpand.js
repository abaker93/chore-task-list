// Aside expand/collapse
const asideExpand = (() => {
    document.getElementById('aside-expand-btn').addEventListener('click', () => {
        const aside = document.getElementById('aside');
        
        if (aside.classList.contains('closed')) {
            aside.classList.remove('closed');
            aside.classList.add('open');
        } else if (aside.classList.contains('open')) {
            aside.classList.remove('open');
            aside.classList.add('closed');
        }
    })
})();

export { asideExpand };