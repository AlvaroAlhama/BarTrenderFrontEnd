import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';

// styles for this kit

import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/animate.min.css";
import "assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// styles for this kit

import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss?v=1.4.0";
import "./assets/demo/demo.css?v=1.4.0";
import "./assets/demo/nucleo-icons-page-styles.css?v=1.4.0";

import "assets/css/dashboard.css";

// import ErrorPage from "./views/ErrorPage.js";
import Login from "./views/Login.js";
import MainView from "./views/MainView.js";
import LandingView from "./views/LandingView.js";
import ListView from "./views/ListView.js";
import ErrorView from "./views/ErrorView.js";

import AdminView from "./views/AdminView.js";
import EstablismentByOwnerView from "./views/EstablishmentByOwnerView.js"
import EstablishmentView from "./views/EstablishmentView.js"


const app = (
  
  <React.StrictMode>
    <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/app" render={(props) => <App {...props} />} />
       
        <Route
          path="/landing"
          render={(props) => <LandingView {...props} />}
        />
        <Route
          path="/main"
          render={(props) => <MainView {...props} />}
        />
        <Route
          path="/list"
          render={(props) => <ListView {...props} />}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} />}
        />

        <Route
          path="/error"
          render={(props) => <ErrorView {...props} />}
        />
        <Route path="/admin" 
          render={(props) => <AdminView {...props} />} />
        
        {/* <Route path="/admin/dashboard" 
          render={(props) => <AdminView {...props} />} /> */}

        
        {/* <Route path="/admin/premiumDashboard" 
          render={(props) => <AdminView {...props} />} /> */}
          
        <Route
          path ="/myEstablishments"
          render = {(props) => <EstablismentByOwnerView {...props}/>}
        />

        <Route
          path = "/establishment"
          render = {(props) =>  <EstablishmentView {...props}/>}
        />

        {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
        <Redirect to="/main" />
        <Redirect from="/" to="/main" />


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
