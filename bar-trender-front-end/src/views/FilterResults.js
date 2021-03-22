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

  const filter = {
    "filters":{
    }
  };
  
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

