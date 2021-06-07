/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useLocation, Route, Switch } from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin.js";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
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
import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
// styles for this kit
import React, { useEffect, useState, Component } from "react";
import ChartistGraph from "react-chartist";

// react-bootstrap components


import FreeDashboardQRList from "../components/FreeDashboardQRlist";
import DashboardTopImage from "../components/DashboardTopImage";
import FreePieChart from "../components/FreePieChart.js";


function AdminView() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const location = useLocation();
  const mainPanel = React.useRef(undefined);
  var token = sessionStorage.getItem("token");

  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [appState, setAppState] = useState({
    bar: {},
  });
  var token = sessionStorage.getItem("token");

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  })

  useEffect(() => {
    const apiUrl =
      "https://bartrenderoficial.herokuapp.com/v1/establishments/get_by_owner";
    async function loadBar() {
      await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apiKey: "8dDc431125634ef43cD13c388e6eCf11",
          token: token,
        },
      })
        .then((response) => response.json())
        .then((bar) => {
          setAppState({ bar: bar });
        });
    }
    loadBar();
  }, [setAppState]);

  if(windowWidth > 990){
    if (!token) {
      return (

        <>
          <div className="wrapper">
            <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
            <div className="main-panel" ref={mainPanel}>
              <AdminNavbar />
              <div className="content">
                <Container fluid>
                  <h1> Necesitas estar Logueado para poder acceder a la vista</h1>
                </Container>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
          <FixedPlugin
            hasImage={hasImage}
            setHasImage={() => setHasImage(!hasImage)}
            color={color}
            setColor={(color) => setColor(color)}
            image={image}
            setImage={(image) => setImage(image)}
          />
        </>
      );
    } else {
      if (sessionStorage.getItem("rol") == "owner") {
        
        return (
          <>
            <div className="wrapper">
              <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
              <div className="main-panel" ref={mainPanel}>
                <AdminNavbar />
                <div className="content">
                  <Container fluid>
                    <h3>Tus Descuentos en uso</h3>
                    {listQREstablishments
                    }


                    <Row>
                      <Col lg="6" md="6" xs="12">
                        <h3>La cerveza favorita de los Usuarios</h3>
                        <Card>
                          <Card.Body>
                            <DashboardTopImage filter={"Bebida"} />
                          </Card.Body>
                          <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                              <i className="now-ui-icons loader_refresh spin"></i>
                      Datos obtenidos de la api de Bartrender
                    </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                      <Col lg="6" md="6" xs="12">
                        <h3>Ranking de las 3 mejores cervezas</h3>
                        <Card>
                          <Card.Header>
                            {/*<Card.Title as="h4">Email Statistics</Card.Title>
                  <p className="card-category">Last Campaign Performance</p>*/}
                          </Card.Header>
                          <Card.Body>
                            <FreePieChart filter={"Bebida"} />
                          </Card.Body>
                          <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                              <i className="now-ui-icons loader_refresh spin"></i>
                      Datos actualizados mensualmente
                    </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6" md="6" xs="12">
                        <h3>¿Que prefiere la gente para divertirse?</h3>
                        <Card>
                          <Card.Header>
                            {/*<Card.Title as="h4">Email Statistics</Card.Title>
                  <p className="card-category">Last Campaign Performance</p>*/}
                          </Card.Header>
                          <Card.Body>
                            <DashboardTopImage filter={"Ocio"} />
                          </Card.Body>
                          <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                              <i className="fas fa-check"></i>
                      Datos obtenidos de la api de Bartrender
                    </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                      <Col lg="6" md="6" xs="12">
                        <h3>Los elementos de ocio más buscados</h3>
                        <Card>
                          <Card.Header></Card.Header>
                          <Card.Body>
                            <FreePieChart filter={"Ocio"} />
                          </Card.Body>
                          <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                              <i className="now-ui-icons loader_refresh spin"></i>
                      Datos actualizados mensualmente
                    </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </div>
                {/* <Footer /> */}
              </div>
            </div>
            <FixedPlugin
              hasImage={hasImage}
              setHasImage={() => setHasImage(!hasImage)}
              color={color}
              setColor={(color) => setColor(color)}
              image={image}
              setImage={(image) => setImage(image)}
            />
          </>
        );
      }
      else {
        return (
          <>
            <div className="wrapper">
              <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
              <div className="main-panel" ref={mainPanel}>
                <AdminNavbar />
                <div className="content">
                  <Container fluid>
                    <h1> Necesitas estar logueado como owner para poder acceder a la vista</h1>
                    <Link to="/main" className="btn btn-primary">Volver</Link>
                  </Container>
                </div>
                {/* <Footer /> */}
              </div>
            </div>
            <FixedPlugin
              hasImage={hasImage}
              setHasImage={() => setHasImage(!hasImage)}
              color={color}
              setColor={(color) => setColor(color)}
              image={image}
              setImage={(image) => setImage(image)}
            />
          </>

        );
      }
    }
  }
  else{
    if (!token) {
      return (
  
        <>
          <div className="wrapper">
            <div className="main-panel" ref={mainPanel}>
              <AdminNavbar />
              <div className="content">
                <Container fluid>
                  <h1> Necesitas estar Logueado para poder acceder a la vista</h1>
                </Container>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </>
      );
    } else {
      if (sessionStorage.getItem("rol") == "owner") {
        
        return (
          <>
            <div className="wrapper">
              <div className="main-panel" ref={mainPanel}>
                <AdminNavbar />
                <div className="content">
                  <Container fluid>
                    <h3>Tus Descuentos en uso</h3>
                    {listQREstablishments
                    }
  
  
                    <Row>
                      <Col lg="6" md="6" xs="12">
                        <h3>La cerveza favorita de los Usuarios</h3>
                        <Card>
                          <Card.Body>
                            <DashboardTopImage filter={"Bebida"} />
                          </Card.Body>
                          <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                              <i className="now-ui-icons loader_refresh spin"></i>
                      Datos obtenidos de la api de Bartrender
                    </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                      <Col lg="6" md="6" xs="12">
                        <h3>Ranking de las 3 mejores cervezas</h3>
                        <Card>
                          <Card.Header>
                            {/*<Card.Title as="h4">Email Statistics</Card.Title>
                  <p className="card-category">Last Campaign Performance</p>*/}
                          </Card.Header>
                          <Card.Body>
                            <FreePieChart filter={"Bebida"} />
                          </Card.Body>
                          <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                              <i className="now-ui-icons loader_refresh spin"></i>
                      Datos actualizados mensualmente
                    </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    </Row>
  
                    <Row>
                      <Col lg="6" md="6" xs="12">
                        <h3>¿Que prefiere la gente para divertirse?</h3>
                        <Card>
                          <Card.Header>
                            {/*<Card.Title as="h4">Email Statistics</Card.Title>
                  <p className="card-category">Last Campaign Performance</p>*/}
                          </Card.Header>
                          <Card.Body>
                            <DashboardTopImage filter={"Ocio"} />
                          </Card.Body>
                          <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                              <i className="fas fa-check"></i>
                      Datos obtenidos de la api de Bartrender
                    </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                      <Col lg="6" md="6" xs="12">
                        <h3>Los elementos de ocio más buscados</h3>
                        <Card>
                          <Card.Header></Card.Header>
                          <Card.Body>
                            <FreePieChart filter={"Ocio"} />
                          </Card.Body>
                          <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                              <i className="now-ui-icons loader_refresh spin"></i>
                      Datos actualizados mensualmente
                    </div>
                          </Card.Footer>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </div>
                {/* <Footer /> */}
              </div>
            </div>
          </>
        );
      }
      else {
        return (
          <>
            <div className="wrapper">
              <div className="main-panel" ref={mainPanel}>
                <AdminNavbar />
                <div className="content">
                  <Container fluid>
                    <h1> Necesitas estar logueado como owner para poder acceder a la vista</h1>
                    <Link to="/main" className="btn btn-primary">Volver</Link>
                  </Container>
                </div>
                {/* <Footer /> */}
              </div>
            </div>
          </>
  
        );
      }
    }
  }
}

export default AdminView;
