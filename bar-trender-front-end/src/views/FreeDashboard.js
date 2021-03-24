import React from "react";
import ChartistGraph from "react-chartist";
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
import DashboardQRList from "../components/FreeDashboardQRlist"

function Dashboard() {



  return (
    <>

<DeviceIdentifier isDesktop={true} isTablet={true} isMobile={true}>
  <MainNavbar />
  <div className="wrapper">
    <LandingPageHeader />
      <Container fluid>
      <div>
        <br/>
        <h2>Estadísticas gratuitas para mejorar tu comercio</h2>
        <br/>
        <h3>Tus descuentos</h3>
      </div>
      <Row>
        <DashboardQRList />
        </Row>
        <Row>
          <Col md="4">
          <h3>Las cervezas más solicitadas</h3>
            <Card>
              <Card.Header>
               {/*<Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>*/}
              </Card.Header>
              <Card.Body>
               <FreePieChart/>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                 Ver las cervezas mas buscadas en tu zona
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                {/*Por si hace falta un header
                <Card.Title as="h4">2017 Sales</Card.Title>
                <p className="card-category">All products including Taxes</p>*/}
              </Card.Header>
              <Card.Body>
              <FreeChart />
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-check"></i>
                  Ver un listado de todas las cervezas
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