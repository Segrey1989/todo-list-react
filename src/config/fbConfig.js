import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'PUT HERE API KEY',
  authDomain: 'todo-list-8711f.firebaseapp.com',
  databaseURL: 'https://todo-list-8711f.firebaseio.com',
  projectId: 'todo-list-8711f',
  storageBucket: 'todo-list-8711f.appspot.com',
  messagingSenderId: '71220183119',
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;
