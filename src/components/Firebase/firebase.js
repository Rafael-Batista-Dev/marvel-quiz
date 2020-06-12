import app from "firebase/app";

import "firebase/auth";

import "firebase/firestore";

const config = {
  //Suas credenciais
  apiKey: "AIzaSyCthuPazeILrkOxvAFpukiprYYGvaxvhGQ",
  authDomain: "marvel-quiz-5a137.firebaseapp.com",
  databaseURL: "https://marvel-quiz-5a137.firebaseio.com",
  projectId: "marvel-quiz-5a137",
  storageBucket: "marvel-quiz-5a137.appspot.com",
  messagingSenderId: "802611792647",
  appId: "1:802611792647:web:71a74617865a166ee613a2",
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  //inscrição
  signupUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // conexão
  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  // desconexão
  signoutUser = () => this.auth.signOut();

  // Recuperar senha
  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  // firestore
  user = (uid) => this.db.doc(`users/${uid}`);
}

export default Firebase;
