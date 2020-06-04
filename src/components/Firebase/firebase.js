import app from "firebase/app";

const config = {
  // suas credenciais
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;
