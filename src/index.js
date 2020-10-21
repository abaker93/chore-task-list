import './styles/styles.scss'

import { setDate } from './scripts/setDate'
import { asideExpand } from './scripts/asideExpand'

import { firebaseAuth } from './scripts/firebase/firebaseAuth'
import { firebaseFirestore } from './scripts/firebase/firebaseFirestore'
import { firebaseCollections } from './scripts/firebase/firebaseCollections'

firebaseAuth
    .then(firebaseCollections)
    .then(firebaseFirestore)