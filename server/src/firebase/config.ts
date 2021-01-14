import firebaseAdmin from 'firebase-admin';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'new-socket-chat-app.firebaseapp.com',
  projectId: 'new-socket-chat-app',
  storageBucket: 'new-socket-chat-app.appspot.com',
  messagingSenderId: '51844717027',
  appId: '1:51844717027:web:0dd8ba7f3621d9339fa8d6',
  measurementId: 'G-TWG9H238TL',
};

firebase.initializeApp(firebaseConfig);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    require('/Users/norbertsanpruch/Desktop/admin-key.json'),
  ),
  databaseURL: 'https://new-socket-chat-app-default-rtdb.firebaseio.com',
});

export const db = firebaseAdmin.firestore();
export const admin = firebaseAdmin;
