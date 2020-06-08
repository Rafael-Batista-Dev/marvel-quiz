import app from "firebase/app";

import "firebase/auth";

const config = {
  //Suas credenciais
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
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
}

export default Firebase;
