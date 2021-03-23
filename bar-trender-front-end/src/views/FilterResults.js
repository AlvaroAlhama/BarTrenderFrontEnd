import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//css
import {

  useLocation
} from "react-router-dom";

import "./css/FilterResults.css"

// core components

import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import List from "../components/List";
import withListLoading from '../components/withListLoading';
import DeviceIdentifier from "react-device-identifier";

function ListPage() {

  // Consuming REST GET
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    establishments: {},
  });

  //  this.state = {establisments:{}}

  var filter = {

    "filters": {
      "zones": "",
      "beers": "",

    }
  };

  //CONSUMING FORM DATA
  const location = useLocation();
  


  

  // if (zones_aux != null) {
  //   if (zones_aux.includes(",")) {
  //     zones_aux = zones_aux.split(",");
  //   } else {
  //     zones_aux = zones_aux.split(" ");
  //   }
  //   filter["filters"]["zones"] = zones_aux == null ? "" : zones_aux

  // }
  // if (beers_aux != null) {
  //   if (beers_aux.includes(",")) {
  //     beers_aux = beers_aux.split(",");
  //   } else {
  //     beers_aux = beers_aux.split(" ");
  //   }
  //   filter["filters"]["beers"] = beers_aux == null ? "" : beers_aux
  // }


  useEffect(() => {
    setAppState({ loading: true });

    // console.log(location.state);

    if (location.state != undefined) {
      var data = location.state[0];
      console.log(data);
      //MAPPING FORM DATA
  
      let beers_aux = [];
      let zones_aux = [];
  
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
  
      filter = {
  
        "filters": {
          "zones": zones_aux,
          "beers": beers_aux,
    
        }
      };
  
    }
    

    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get";

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(filter),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(establishments => {
        setAppState({ loading: false, establishments: establishments });
      });
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
        <ExamplesNavbar />
        <div className="wrapper">
          <LandingPageHeader />
          <div class="container mt-5">
            <ListLoading isLoading={appState.loading} establishments={appState.establishments} />
          </div>
        </div>
      </DeviceIdentifier>
      <DeviceIdentifier isMobile={true}>
        <ExamplesNavbar />
        <div className="wrapper">
          <LandingPageHeader />
          <div class="container mt-5">
            <ListLoading isLoading={appState.loading} establishments={appState.establishments} />
          </div>
        </div>
      </DeviceIdentifier>

    </>
  );
}

export default ListPage;

