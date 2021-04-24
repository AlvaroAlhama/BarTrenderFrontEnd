// import React from "react";
import React, { useEffect, useState } from 'react';

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import MainNavbar from "../components/Navbars/MainNavbar.js";
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import List from "../components/List";
import withListLoading from '../components/withListLoading';

function LandingPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);

  // Consuming REST GET
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });
  useEffect(() => {
    setAppState({ loading: true });
    // TODO: PODEMOS CAMBIAR ESTO DINAMICAMENTE, POR DEFECTO QUE NOS DEVUELVA UNAS Y AL HACER EL SEARCH -> POST 
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
        <LandingPageHeader />
       
       
        </div>       
       

    </>
  );
}

export default LandingPage;
