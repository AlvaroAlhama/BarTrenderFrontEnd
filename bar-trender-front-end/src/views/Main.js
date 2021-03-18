// import React from "react";
import React, { useEffect, useState } from 'react';

// core components
import MainNavbar from "../components/Navbars/MainNavbar.js";
import MainHeader from "../components/Headers/MainHeader.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";
import List from "../components/List";
import withListLoading from '../components/withListLoading';

function LandingPage() {

  // Consuming REST GET
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.github.com/users/hacktivist123/repos`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [setAppState]);

  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <MainHeader />  
        <div className='container'>
          <h1>My Repositories</h1>
        </div>
        <div className='repo-container ml-4 mr-4'>
          <ListLoading isLoading={appState.loading} repos={appState.repos} />
        </div>
        <DefaultFooter />
      </div>
      
    </>
  );
}

export default LandingPage;
