import './styles/styles.scss';
import { setDate } from './components/setDate';
import { asideExpand } from './components/asideExpand';
import { firebaseAuth } from './components/firebase/firebaseAuth';
import { firebaseFirestore } from './components/firebase/firebaseFirestore';
// import { completeChore } from './components/firebase/firestore/completeChore';

firebaseAuth.then(firebaseFirestore); 

const completeChore = () => {
    const parent = this.parentElement;
	console.log(parent);
}