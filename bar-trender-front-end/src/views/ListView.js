import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//css
import {

  useLocation
} from "react-router-dom";

import "./css/FilterResults.css"

// core components

import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import List from "../components/List";
import withListLoading from '../components/withListLoading';
import DeviceIdentifier from "react-device-identifier";
import MainNavbar from 'components/Navbars/MainNavbar';
import DefaultFooter from "../components/Footers/DefaultFooter.js";

import "./css/ListView.css";

function ListView() {

  // Consuming REST GET
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    establishments: {},
  });

  var filter = {
    "filters": {
    }
  };
  //CONSUMING FORM DATA
  const location = useLocation();

  useEffect(() => {

    setAppState({ loading: true });

    if (location.state != undefined) {
      var data = location.state[0];
      // console.log(data);

      //MAPPING FORM DATA
      let beers_aux = [];
      let zones_aux = [];
      let leisures_aux = [];

      if (data['Paulaner'] == "on") {
        beers_aux.push("Paulaner");
      }
      if (data['Cruzcampo'] == "on") {
        beers_aux.push("Cruzcampo");
      }
      if (data['Alameda'] == "on") {
        zones_aux.push("Alameda");
      }
      if (data['Triana'] == "on") {
        zones_aux.push("Triana");
      }
      if (data['Billar'] == "on") {
        leisures_aux.push("Billar");
      }
      if (data['Dardos'] == "on") {
        leisures_aux.push("Dardos");
      }

        if(zones_aux.length != 0){
          filter["filters"]["zones"] = zones_aux;
        }
        if(beers_aux.length != 0){
          filter["filters"]["beers"] = beers_aux;
        }
        if(leisures_aux.length != 0){
          filter["filters"]["leisures"] = leisures_aux;
        }
      
    }

    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get";

    async function loadResults() {
      await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(filter),
        headers: {
          'Content-Type': 'application/json',
          'apiKey': '8dDc431125634ef43cD13c388e6eCf11'
        }
      })
        .then(response => response.json())
        .then(establishments => {
          setAppState({ loading: false, establishments: establishments });
        });
    }
    loadResults()

  }, [setAppState, location]);



  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>

      <DeviceIdentifier isDesktop={true} isTablet={true}>
        <MainNavbar />
        <div className="wrapper">
          <LandingPageHeader />
          <section class="container mt-5" id = "list-results" > 
            <ListLoading isLoading={appState.loading} establishments={appState.establishments} />
          </section>
            
        </div>
        <DefaultFooter />
      </DeviceIdentifier>
      <DeviceIdentifier isMobile={true}>
        <MainNavbar />
        <div className="wrapper">
          <LandingPageHeader />
          <section>
          <ListLoading isLoading={appState.loading} establishments={appState.establishments} />
          </section>
          {/* <div class="container mt-5">
            <ListLoading isLoading={appState.loading} establishments={appState.establishments} />
          </div> */}
        </div>
        <DefaultFooter />
      </DeviceIdentifier>

    </>
  );
}

export default ListView;

