import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC38rYk_vK2KwjnWcw5IUn26JJ2cGUsuCU",
  authDomain: "chinesegang-f6ee1.firebaseapp.com",
  databaseURL: "https://chinesegang-f6ee1.firebaseio.com",
  projectId: "chinesegang-f6ee1",
  storageBucket: "chinesegang-f6ee1.appspot.com",
  messagingSenderId: "1071211992373",
  appId: "1:1071211992373:web:10d934f3d716b0c972687c",
};

const  auth = firebase.initializeApp(firebaseConfig).auth();
export default auth;

