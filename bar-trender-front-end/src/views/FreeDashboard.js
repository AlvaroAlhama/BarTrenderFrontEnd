import React from "react";

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
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";
import FreeChart from "../components/FreeChart.js";
import FreePieChart from "../components/FreePieChart.js";
import DashboardQRList from "../components/FreeDashboardQRlist";
import "./css/FreeDashboard.css";
import { render } from "@testing-library/react";



function Dashboard() {

  var graph1 = {
      chartData:{
        labels: ['Cruzcampo', 'Mahou', 'Paulaner', 'Otros'],
        datasets:[
          {
            label:'Busquedas',
            data:[
              217594,
              181045,
              153060,
              136519,
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
            
          }
        ]
      
    }
  };

  var graph2 = {
    chartData:{
      labels: ['Billar', 'Pista de Baile', 'Futbolin', 'Otros'],
      datasets:[
        {
          label:'Busquedas',
          data:[
            111455,
            23444,
            13060,
            331,
          ],
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
          
        }
      ]
    
  }
};



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
      
        <DashboardQRList />
       
        <Row>
          <Col md="6">
          <h3>La cerveza favorita de los Usuarios</h3>
            <Card>
              <Card.Header>
               {/*<Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>*/}
              </Card.Header>
              <Card.Body>
              <h3>Cruzcampo</h3>
              
              <img src="https://www.cruzcampo.es/img/cc/logo-vertical-cruzcampo@3x.png" alt="Cruzcampo"></img>
               { /*<div className="stats">
                  <i className="fas fa-check"></i>
                 Ver las cervezas mas buscadas en tu zona
                </div>
                */}
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
               <FreePieChart data = {graph1}/>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                 Ver las cervezas mas buscadas en tu zona
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6">
          <h3>¿Que prefiere la gente de tu zona para divertirse?</h3>
            <Card>
              <Card.Header>
               {/*<Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>*/}
              </Card.Header>
              <Card.Body>
              <img src="https://media.zurione.com/product/mesa-de-billar-semi-profesional-cortes-pl0339b-800x800.jpeg" alt="Cruzcampo"></img>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <h3>Los elementos de ocio preferidos por los usuarios</h3>
            <Card>
              <Card.Header>
                {/*Por si hace falta un header
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>*/}
              </Card.Header>
              <Card.Body>
              <FreeChart data = {graph2} />
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Ver donde estan tus elementos de ocio en el ranking de busquedas total
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        
      </Container>
      <DefaultFooter />
      </div>
      </DeviceIdentifier>
    </>
  );
}

export default Dashboard;