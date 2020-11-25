import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from "./views/SignUpPage/SignUp";
import SignIn from "./views/SignInPage/SignIn";
import LandingPage from "./views/LandingPage/LandingPage";
import AdsCreate from "./views/AdsPage/AdsCreate";
import AdsList from "./views/AdsPage/AdsList";
import AdsEdit from "./views/AdsPage/AdsEdit";
import AdsPage from "./views/AdsPage/AdsPage";
import SecondHandList from "./views/SecondHand/SecondHandList";
import SecondHandEdit from "./views/SecondHand/SecondHandEdit";
import SecondHandCreate from "./views/SecondHand/SecondHandCreate";
import SecondHandPage from "../src/views/SecondHand/SecondHandPage";
ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/SignIn" component={SignIn} />
      <Route exact path="/AdsCreate" component={AdsCreate} />
      <Route exact path="/AdsList" component={AdsList} />
      <Route exact path="/AdsEdit" component={AdsEdit} />
      <Route exact path="/AdsPage" component={AdsPage} />
      <Route exact path="/SecondHandPage" component={SecondHandPage} />
      <Route exact path="/SecondHandCreate" component={SecondHandCreate} />
      <Route exact path="/SecondHandList" component={SecondHandList} />
      <Route exact path="/SecondHandEdit" component={SecondHandEdit} />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
