import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDF39_aZ0-iCye_3Tp_IM_8NTZ6_Ug8wIQ",
  authDomain: "vue-elbrus-crm.firebaseapp.com",
  databaseURL: "https://vue-elbrus-crm.firebaseio.com",
  projectId: "vue-elbrus-crm",
  storageBucket: "vue-elbrus-crm.appspot.com",
  messagingSenderId: "759948209075",
  appId: "1:759948209075:web:9fae0b93c982e62c2f79c6",
  measurementId: "G-8CXQZCPMX0"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
  storage, firebase as default
}
