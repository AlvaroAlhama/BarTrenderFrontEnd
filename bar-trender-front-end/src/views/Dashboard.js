import React, { useEffect, useState} from "react";
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import FreeDashboardQRList from "../components/FreeDashboardQRlist";
import DashboardTopImage from "../components/DashboardTopImage";
import FreePieChart from "../components/FreePieChart.js";

function Dashboard() {
  const [appState, setAppState] = useState({
    bar: {},

  });
  useEffect(() => {
    var token = sessionStorage.getItem("token");
    const apiUrl =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_by_owner";
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


  if (appState.bar[0] === undefined) {

    return (
      <>
        <Container fluid>
          <Row>
            <Card>
              <h2>No ha añadido ningun establecimiento a nuestra aplicación. Puede acceder a las estadisticas gratuitas, pero no podrá acceder a la creacion de descuentos hasta que añada uno </h2>
            </Card>
          </Row>
          <Row>
            <Col md="4">
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
            <Col md="4">
              <h3>Ranking de las 3 mejores cervezas</h3>
              <Card>
                <Card.Header>
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
            <Col md="4">
              <h3>¿Que prefiere la gente para divertirse?</h3>
              <Card>
                <Card.Header>
                  
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
            <Col md="4">
              <h3>Los elementos de ocio más buscados</h3>
              <Card>
                <Card.Header></Card.Header>
                <Card.Body>
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
      </>

    )
  }





  else {
    const listQREstablishments = appState.bar.map((i) =>
      <FreeDashboardQRList nameEstablishment={i.name_text} idEstablishment={i.id} />
    );
    return (
      <>
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
      </>
    );
  }
}



export default Dashboard;
