// import React from "react";
import React, { useEffect, useState } from 'react';

// core components
import MainNavbar from "../components/Navbars/MainNavbar.js";
import MobileNavbar from "../components/Navbars/MobileNavbar.js";

import MainHeader from "../components/Headers/MainHeader.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";
import List from "../components/List";
import withListLoading from '../components/withListLoading';

import DeviceIdentifier from 'react-device-identifier';

function MainPage() {

  // Consuming REST GET
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = "https://api.github.com/users/hacktivist123/repos";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [setAppState]);


  return (
    <>
    <DeviceIdentifier isDesktop={true} isTablet={true}>
    {/* Desktop Component goes here */}
    <MainNavbar />
      <div className="wrapper">
        <MainHeader />  
        <div className='container'>
          <h1>My Repositories on Desktop</h1>
        </div>
        <div className='repo-container ml-4 mr-4'>
          <ListLoading isLoading={appState.loading} repos={appState.repos} />
        </div>
        <DefaultFooter />
      </div>
    </DeviceIdentifier>
    <DeviceIdentifier isMobile={true}>
    {/* isMobile Component goes here */}
    <MobileNavbar />
      <div className="wrapper">
        <MainHeader />  
        <div className='container'>
          <h1>My Repositories on Mobile</h1>
        </div>
        <div className='repo-container ml-2 mr-2'>
          <ListLoading isLoading={appState.loading} repos={appState.repos} />
        </div>
        <DefaultFooter />
      </div>
    </DeviceIdentifier>
      
    </>
  );
}

export default MainPage;
