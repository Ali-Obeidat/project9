import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCSpCG2T_yhZBY-LGN-d0vpbbinK0TF0wk",
  authDomain: "ali-fire-test.firebaseapp.com",
  projectId: "ali-fire-test",
  storageBucket: "ali-fire-test.appspot.com",
  messagingSenderId: "32079689380",
  appId: "1:32079689380:web:d7feff7c7822e25fe11831"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }