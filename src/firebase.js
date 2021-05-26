import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB-xKHmxbQj5FDnrRXF-JDPOmcmTY0hKIo",
    authDomain: "react-crud-udemy-3536b.firebaseapp.com",
    projectId: "react-crud-udemy-3536b",
    storageBucket: "react-crud-udemy-3536b.appspot.com",
    messagingSenderId: "714284411197",
    appId: "1:714284411197:web:ea2ba60a6f0a3fd5037d54"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
const auth = firebase.auth()

// Exportamos a firebase porque vamos a necesitar a fururo de un Provider
export { auth, firebase } 