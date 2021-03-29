import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.4.0";
import "./assets/demo/demo.css?v=1.4.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit

import MainPage from "./views/MainPage.js";
import LandingPage from "./views/LandingPage.js";
import ListPage from "./views/FilterResults.js"
import ErrorPage from "./views/ErrorPage.js"
import Login from "./views/Login.js"

const app = (

  <React.StrictMode>
    <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/app" render={(props) => <App {...props} />} />
       
        <Route
          path="/index"
          render={(props) => <LandingPage {...props} />}
        />
        <Route
          path="/main"

          render={(props) => <MainPage {...props} />}

        />
        <Route
          path="/list"
          render={(props) => <ListPage {...props} />}
        />

        <Route
          path="/login"
          render={(props) => <Login {...props} />}
        />

        <Route
          path="/error"
          render={(props) => <ErrorPage {...props} />}
        />

        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </BrowserRouter>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
