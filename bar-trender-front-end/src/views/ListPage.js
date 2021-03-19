import React, { useEffect, useState } from 'react';

//css
import  "./css/FilterResults.css"

// core components
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import List from "../components/FilterResults";
import withListLoading from '../components/withListLoading';

function ListPage() {
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
    <ExamplesNavbar />
    <div className="wrapper"> 
      <LandingPageHeader />
    <div class="container mt-5">
      <ListLoading isLoading={appState.loading} repos={appState.repos} />
    </div>
    </div>
    </>
  );
}

export default ListPage;