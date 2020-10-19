import { tasks } from '../firebaseFirestore'
import { displayChoreDetails } from './displayChoreDetails';

// display chores from tasks[]
const displayChores = () => {
    const container = document.getElementById('chore-list')
    container.innerHTML = ''

    for (let i=0; i<tasks.length; i++) {
        const li = document.createElement('li')
        li.classList.add('chore-item')
        li.setAttribute('id', tasks[i].id)

        if (tasks[i].complete) {
            li.classList.add('checked')
        } else if (tasks[i].complete == false) {
            li.classList.remove('checked')
        }

        if (tasks[i].priority == 'low') {
            tasks[i].priority = '!'
        } else if (tasks[i].priority == 'medium') {
            tasks[i].priority = '!!'
        } else if (tasks[i].priority = 'high') {
            tasks[i].priority = '!!!'
        }

        li.innerHTML =
            `<svg class="checkbox" viewBox="0 0 20 20"><path d="M0,0v20h20V0H0z M19,19H1V1h18V19z"/><path class="check" d="M5.7,15.8c0.6,0.8,1.7,1,2.4,0.4c0.2-0.2,0.4-0.4,0.5-0.6l0,0c0,0,0,0,0,0c0-0.1,0.1-0.1,0.1-0.2c0.6-1.4,4-8.3,8.7-11.9 c0,0-5.9,0.2-10.4,8.2L5.4,9.3c-0.6-0.8-3.4,1.2-2.9,2L5.7,15.8z"/></svg>
            <span class="title">${tasks[i].title}</span>
            <span class="date">${tasks[i].date}</span>
            <span class="priority">${tasks[i].priority}</span>
            <svg class="chore-details-btn" viewBox="0 0 20 20"><path d="M10,0c1.6,0,2.9,1.3,2.9,2.9S11.6,5.8,10,5.8c-1.6,0-2.9-1.3-2.9-2.9S8.4,0,10,0z M12.9,10c0,1.6-1.3,2.9-2.9,2.9 c-1.6,0-2.9-1.3-2.9-2.9S8.4,7.1,10,7.1C11.6,7.1,12.9,8.4,12.9,10z M10,14.2c1.6,0,2.9,1.3,2.9,2.9c0,1.6-1.3,2.9-2.9,2.9 c-1.6,0-2.9-1.3-2.9-2.9C7.1,15.5,8.4,14.2,10,14.2z"/></svg>`
        container.append(li)
    }
    displayChoreDetails()
}

export { displayChores }