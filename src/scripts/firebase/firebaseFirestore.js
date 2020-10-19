import { userID } from './firebaseAuth'
import { displayChores } from './firestore/displayChores'
import { completeChore } from './firestore/completeChore'
import { displayChoreDetails } from './firestore/displayChoreDetails'

import * as firebase from 'firebase/app'
require('firebase/firestore')

let tasks = []
let collectionPath = ''
let list = 'default'

const db = firebase.firestore()

const getCollectionPath = list => {
    collectionPath = userID + '/lists/' + list
};

const firebaseFirestore = () => {

    const readChoresDB = new Promise((resolve, reject) => {
        console.log(userID)
        getCollectionPath(list);
        console.log(collectionPath)
        
        db.collection(collectionPath)
            .where('title', '!=', null)
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const id = doc.id
                    const title = doc.data().title
                    const desc = doc.data().desc
                    const date = doc.data().date
                    let priority = doc.data().priority
                    const complete = doc.data().complete
    
                    tasks.push({
                        'id': id,
                        'title': title,
                        'desc': desc,
                        'date': date,
                        'priority': priority,
                        'complete': complete
                    })
                })
                
                if (querySnapshot) {
                    resolve('read database')
                } else {
                    reject('failed to read database')
                }
            })
    })
    
    readChoresDB
        .then(displayChores)
        .then(completeChore)
        .then(displayChoreDetails)
}

export {
    firebaseFirestore,
    tasks,
    collectionPath,
    db
}