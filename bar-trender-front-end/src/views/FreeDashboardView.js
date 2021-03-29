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
import FreeChart from "../components/FreeChart.js";
import FreePieChart from "../components/FreePieChart.js";
import "./css/FreeDashboard.css";
import FreeDashboardQRList from "../components/FreeDashboardQRlist"



function FreeDashboardView() { 
  // Consuming REST GET
 {/* const ListLoading = withListLoading(DashboardQRList);
  const [appState, setAppState] = useState({
    loading: false,
    discounts: {},
    
  });

  var filter = {
    "filters": {
    }
  };
  {/*
  //CONSUMING FORM DATA
  const location = useLocation();
  
  useEffect(() => {

    setAppState({ loading: true });


    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/1/discounts/get";
    const apiUrl2 = "http://develop-backend-sprint-01.herokuapp.com/v1/stats/get";
    async function loadResults() {
      await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(filter),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(discounts => {
          setAppState({ loading: false, discounts: discounts });
        
        });
    }
    loadResults()
{/*
    async function loadResults2() {
      await fetch(apiUrl2, {
        method: 'POST',
        body: JSON.stringify(filter),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(stats => {
          setAppState({ loading: false, stats: stats });
        
        });
    }
    loadResults2()


  }, [setAppState, location]);

*/}








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
      
      {/*<ListLoading isLoading={appState.loading} discounts={appState.discounts} stats = {appState.stats}/>*/}
       <FreeDashboardQRList/>
        <Row>
          <Col md="6">
          <h3>La cerveza favorita de los Usuarios</h3>
            <Card>
              <Card.Header>
               {/*<Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>*/}
              </Card.Header>
              <Card.Body>
              
              
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
          <h3>¿Que prefiere la gente de tu zona para divertirse?</h3>
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
                {/*Por si hace falta un header
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>*/}
              </Card.Header>
              <Card.Body>
              <FreeChart data = {graph2} />
              </Card.Body>
              {/*<Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Ver donde estan tus elementos de ocio en el ranking de busquedas total
                </div>
              </Card.Footer>*/}
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="6">
          <h3>Nuestro estabkecimiento más famoso</h3>
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
              <FreeChart data = {graph2} />
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