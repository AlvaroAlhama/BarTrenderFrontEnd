import React, { useEffect, useState } from 'react';
import {

 useLocation
} from "react-router-dom";

import DeviceIdentifier from 'react-device-identifier';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import MainNavbar from "../components/Navbars/MainNavbar.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";
import FreePieChart from "../components/FreePieChart.js";
import "./css/FreeDashboard.css";
import FreeDashboardQRList from "../components/FreeDashboardQRlist"
import DashboardTopImage from "../components/DashboardTopImage"


function FreeDashboardView() { 




  return (
    <>

<DeviceIdentifier isDesktop={true} isTablet={true} isMobile={true}>
  <MainNavbar />
  <div className="wrapper container">
    <Card/>
    <Card/>
    <Card/>
      <Container fluid>
      
      <div>
        <br/>
        <h2>Estadísticas gratuitas para mejorar tu comercio</h2>
        <br/>
        <h3>Tus descuentos</h3>
      </div>
      
     
       <FreeDashboardQRList/>
        <Row>
          <Col md="6">
          <h3>La cerveza favorita de los Usuarios</h3>
            <Card>
              <Card.Body>
              <DashboardTopImage filter = {"Bebidas"}/>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
          <h3>Ranking de las 3 mejores cervezas</h3>
            <Card>
              <Card.Header>
               {/*<Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>*/}
              </Card.Header>
              <Card.Body>
               <FreePieChart filter = {"Bebidas"}/>
               {/* <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                 Ver las cervezas mas buscadas en tu zona
               </div>*/}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6">
          <h3>¿Que prefiere la gente para divertirse?</h3>
            <Card>
              <Card.Header>
               {/*<Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>*/}
              </Card.Header>
              <Card.Body>
              <img src="https://images-na.ssl-images-amazon.com/images/I/31tjReD7IGL._AC_.jpg" alt="billar"></img>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <h3>Los elementos de ocio preferidos por los usuarios</h3>
            <Card>
              <Card.Header>
              </Card.Header>
              <Card.Body>
              <FreePieChart filter = {"ElementosDeOcio"}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6">
          <h3>Nuestro establecimiento más famoso</h3>
            <Card>
              <Card.Header>
               {/*<Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>*/}
              </Card.Header>
              <Card.Body>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Heraldic_Crown_of_the_Prince_of_Asturias.svg/220px-Heraldic_Crown_of_the_Prince_of_Asturias.svg.png" alt="El mejor"></img>
              <h3>Tetería Andauni</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <h3>Los establecimientos más buscados</h3>
            <Card>
              <Card.Header>
                {/*Por si hace falta un header
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>*/}
              </Card.Header>
              <Card.Body>
              <FreePieChart filter = {"Establecimientos"}/>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        
      </Container>
     
      </div>
      <DefaultFooter />
      </DeviceIdentifier>
    </>
  );
}

export default FreeDashboardView;