import firebase from '@firebase/app'
import 'firebase/storage';
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database()


export {
  storage, database, firebase as default
}
