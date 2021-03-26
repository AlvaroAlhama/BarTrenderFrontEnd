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
import MainHeader from "../components/Headers/MainHeader.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";
import Carousel from "../components/Carousel.js";
import ModalSelectedElement from "../components/Modals/ModalSelectedElement.js";

import List from "../components/List";
import withListLoading from '../components/withListLoading';

import image_left from '../assets/img/expositions/hU-kQ3Epxeq2dhaBpUgYfYaPhHEOKXnHXSeUqLjTygYBV05OHhUSZEWilh_Da9zkI1d_cgz91KIPevD_BBhBWhaKevognkx6Bv7-QwkQdRG9oznKG6wOae4avH8ksi6bkJBLWl4.png';


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


  // React.useEffect(() => {
  //   document.body.classList.add("landing-page");
  //   document.body.classList.add("sidebar-collapse");
  //   document.documentElement.classList.remove("nav-open");
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  //   return function cleanup() {
  //     document.body.classList.remove("landing-page");
  //     document.body.classList.remove("sidebar-collapse");
  //   };
  // }, []);

  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <MainHeader />
       

        
        
          <Container>
            
            <Carousel />
            <div className="separator separator-primary"></div>
          </Container>
        </div>
        

        <DefaultFooter />
        
      
      
    </>
  );
}

export default LandingPage;
