import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../Header";
import Painel from "../Painel";
import Landing from "../Landing";
import Login from "../Login";
import Signup from "../Signup";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";
import "../../App.css";
import { IconContext } from "react-icons";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Header />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/painel" component={Painel} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forget-password" component={ForgetPassword} />
          <Route component={ErrorPage} />
        </Switch>
      </IconContext.Provider>
    </Router>
  );
}

export default App;
