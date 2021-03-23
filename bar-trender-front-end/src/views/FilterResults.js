import React, { useEffect, useState } from 'react';

//css
import  "./css/FilterResults.css"

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
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get('zones'));
  let zones = urlParams.get('zones')
  let beers = urlParams.get('beers')
  const filter = {
    
    "filters":{
     
    }
  };
  
  if(zones!= null){
  if(zones.includes(",")){
    zones = zones.split(",");
  }else{
    zones=zones.split(" ");
  }
  filter["filters"]["zones"] = zones == null?"":zones
  
}
  if(beers!= null){
  if(beers.includes(",")){
    beers = beers.split(",");
  }else{
    beers=beers.split(" ");
  }
  filter["filters"]["beers"] = beers == null?"":beers
}
  useEffect(() => {
    setAppState({ loading: true });
    

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
  }, [setAppState]);
  


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

