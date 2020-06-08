import app from "firebase/app";

import "firebase/auth";

import "firebase/firestore";

const config = {
  //Suas credenciais
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
