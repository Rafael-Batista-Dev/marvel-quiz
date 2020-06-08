import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../Header";
import Painel from "../Painel";
import Landing from "../Landing";
import Login from "../Login";
import Signup from "../Signup";
import ErrorPage from "../ErrorPage";
import "../../App.css";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/painel" component={Painel} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
