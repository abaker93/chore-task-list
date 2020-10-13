import './styles/styles.scss';
import { setDate } from './components/setDate';
import { asideExpand } from './components/asideExpand';
import { firebaseAuth } from './components/firebase/firebaseAuth';
import { firebaseFirestore } from './components/firebase/firebaseFirestore';

firebaseAuth.then(firebaseFirestore);