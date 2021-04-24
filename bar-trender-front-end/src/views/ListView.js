import React, { useEffect, useState } from 'react';
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
    console.log("Construyendo view")
    setAppState({ loading: true });

    if (location.state !== undefined) {
      var data = location.state[0];
    
      for (const key in data) {
        if (!(key === 'modal' || key === 'fade' ||  key ==='pills')){
          filter["filters"][key] = data[key];

        }
      }
    }
<<<<<<< HEAD
=======

    }
>>>>>>> develop

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
<<<<<<< HEAD
    
    filter = {
      "filters": {  
      }
    }
=======

    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      
      sessionStorage.setItem("user_location_lat",position.coords.latitude);
      sessionStorage.setItem("user_location_lng",position.coords.longitude);

      

    });

    

>>>>>>> develop
  }, [setAppState, location]);



  React.useEffect(() => {

    
  
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
          <DefaultFooter />
        </div>
        
      </DeviceIdentifier>
      <DeviceIdentifier isMobile={true}>
        <MainNavbar />
        <div className="wrapper">
          <LandingPageHeader />
          <section>
          <ListLoading isLoading={appState.loading} establishments={appState.establishments} />
          </section>
         
        </div>
   
      </DeviceIdentifier>

    </>
  );
}

export default ListView;

