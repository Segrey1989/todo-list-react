import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAeH71xmT1OraCG6L9qOMvBtrxRU9sSn6A',
  authDomain: 'todo-list-8711f.firebaseapp.com',
  databaseURL: 'https://todo-list-8711f.firebaseio.com',
  projectId: 'todo-list-8711f',
  storageBucket: 'todo-list-8711f.appspot.com',
  messagingSenderId: '71220183119',
};
firebase.initializeApp(config);
firebase.firestore();
firebase.auth();

export default firebase;
