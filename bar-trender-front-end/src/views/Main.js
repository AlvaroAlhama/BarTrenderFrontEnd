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
import Carousel from "./index-sections/Carousel.js";
import ModalSelectedElement from "../components/ModalSelectedElement.js";

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
        <div id="sobre-nosotros" className="section section-about-us">
          {/* <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">¿Quiénes somos?</h2>
                <h5 className="">
                  Somos un grupo de estudiantes de la Universidad de Sevilla y queremos presentarle este nuevo proyecto en el que estamos trabajando para el cual nos es muy importante su ayuda.
                  Nuestro objetivo es promocionar y descubrir nuevos lugares a nuestros usuarios, en el que puedan compartir grandes momentos sociales; y qué mejor lugar para compartirlos, que en nuestros bares, cervecerías y pubs.
                </h5>
              </Col>
              
            </Row>
            <div className="separator separator-primary"></div>
          </Container> */}
        {/* <ModalSelectedElement /> */}

        </div>
        <div id="sobre-nosotros" className="section section-about-us">
          {/* <Container>
            
            <Carousel />
            <div className="separator separator-primary"></div>
          </Container> */}
        </div>
        

        
        <div id="contact-us" className="section section-contact-us text-center">
          {/* <Container>
            <form action="mailto:bartrenderoficial@gmail.com" method="post" enctype="text/plain">

              <h2 className="title">¿Quieres saber más sobre el proyecto?</h2>
              <p className="">Sientete libre de contactarnos sobre cualquier tema</p>
              <Row>
                <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                  <InputGroup
                    className={
                      "input-lg" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Nombre..."
                      type="text"
                      name="Nombre"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>

                  </InputGroup>
                  <InputGroup
                    className={
                      "input-lg" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                  </InputGroup>
                  <div className="textarea-container">
                    <Input
                      cols="80"
                      name="Comentario"
                      placeholder="Escribe tu mensaje..."
                      rows="4"
                      type="textarea"
                    ></Input>
                  </div>
                  <div className="send-button">
                    <input className="btn-round info block" type="submit" value="Enviar"></input>
                    <input className="btn-round info block ml-4" type="reset" value="Borrar"></input>
                  </div>
                </Col>
              </Row>
            </form>

          </Container> */}
        </div>
        <div className='container'>
          <h1>My Repositories</h1>
        </div>
        <div className='repo-container'>
          <ListLoading isLoading={appState.loading} repos={appState.repos} />
        </div>
        

        <DefaultFooter />
        
      </div>
      
    </>
  );
}

export default LandingPage;
