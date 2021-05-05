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
import './css/Dashboard.css';

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

            </Card>
            <Card>

              <Card.Body>
                <Container fluid>
                  <Row classname="justify-content-center">
                    <div className="numbers text-center">
                      <p className="card-category">
                        Tus establecimientos
                        </p>
                    </div>
                  </Row>
                  <Row className="justify-content-center">
                    <div className="icon-big icon-warning">
                      <h3>No ha añadido ningun establecimiento a nuestra aplicación. Puede acceder a las estadisticas gratuitas,
                pero no podrá acceder a la creacion de descuentos hasta que añada uno </h3>
                    </div>
                  </Row>
                </Container>
              </Card.Body>

            </Card>
          </Row>
          <Row>
            <Col lg="6" md="6" xs="12">
              <Card>

                <Card.Body>
                  <Container fluid>
                    <Row classname="justify-content-center">
                      <div className="numbers text-center">
                        <p className="card-category">
                          La cerveza favorita de los Usuarios
                        </p>
                      </div>
                    </Row>
                    <Row className="justify-content-center">
                        <DashboardTopImage filter={"Bebida"} />
                    </Row>
                  </Container>
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
              <Card>
                <Card.Header>

                </Card.Header>
                <Card.Body>
                  <Container fluid>
                    <Row classname="justify-content-center">
                      <div className="numbers text-center">
                        <p className="card-category">
                          Ranking de las 3 mejores cervezas
                        </p>
                      </div>
                    </Row>
                    <Row className='h-100'>

                      <FreePieChart filter={"Bebida"} />

                    </Row>
                  </Container>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin"></i>
                    Datos actualizados a diario
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="6" md="6" xs="12">
              <Card>
                <Card.Header>

                </Card.Header>
                <Card.Body>
                  <Container fluid>
                    <Row classname="justify-content-center">
                      <div className="numbers text-center">
                        <p className="card-category">
                          ¿Qué prefiere la gente para divertirse?
                        </p>
                      </div>
                    </Row>
                    <Row className="justify-content-center">
                      <div className="icon-big icon-warning">
                        {/* <i className="nc-icon nc-favourite-28 text-primary"></i> */}
                        <DashboardTopImage filter={"Ocio"} />
                      </div>
                    </Row>
                  </Container>
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
              <Card>
                <Card.Header></Card.Header>
                <Card.Body>
                  <Container fluid>
                    <Row classname="justify-content-center">
                      <div className="numbers text-center">
                        <p className="card-category">
                          Los elementos de ocio más buscados
                        </p>
                      </div>
                    </Row>
                    <Row className='justify-content-center h-100'>

                      <FreePieChart filter={"Ocio"} />

                    </Row>
                  </Container>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin"></i>
                    Datos actualizados a diario
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
        <Container fluid className="p-0">

          <h3>Tus Descuentos en uso</h3>
          {listQREstablishments
          }


          <Row>
            <Col lg="6" md="6" xs="12">
              <Card>

                <Card.Body>
                  <Container fluid>
                    <Row classname="justify-content-center">
                      <div className="numbers text-center">
                        <p className="card-category">
                          La cerveza favorita de los Usuarios
                        </p>
                      </div>
                    </Row>
                    <Row className="justify-content-center">
                      <div className="icon-big icon-warning">
                        {/* <i className="nc-icon nc-favourite-28 text-primary"></i> */}
                        <DashboardTopImage filter={"Bebida"} />
                      </div>
                    </Row>
                  </Container>
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
              <Card>
                <Card.Header>

                </Card.Header>
                <Card.Body>
                  <Container fluid className='h-100'>
                    <Row classname="justify-content-center">
                      <div className="numbers text-center">
                        <p className="card-category">
                          Ranking de las 3 mejores cervezas
                        </p>
                      </div>
                    </Row>
                    <Row className="justify-content-center h-100">
                      <FreePieChart filter={"Bebida"} />

                    </Row>
                  </Container>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin"></i>
                    Datos actualizados a diario
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg="6" md="6" xs="12">
              <Card>
                <Card.Header>

                </Card.Header>
                <Card.Body>
                  <Container fluid>
                    <Row classname="justify-content-center">
                      <div className="numbers text-center">
                        <p className="card-category">
                          ¿Qué prefiere la gente para divertirse?
                        </p>
                      </div>
                    </Row>
                    <Row className="justify-content-center">
                      <div className="icon-big icon-warning">
                        {/* <i className="nc-icon nc-favourite-28 text-primary"></i> */}
                        <DashboardTopImage filter={"Ocio"} />
                      </div>
                    </Row>
                  </Container>
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
              <Card>
                <Card.Header></Card.Header>
                <Card.Body>
                  <Container fluid>
                    <Row classname="justify-content-center">
                      <div className="numbers text-center">
                        <p className="card-category">
                          Los elementos de ocio más buscados
                        </p>
                      </div>
                    </Row>
                    <Row className='justify-content-center h-100'>

                      <FreePieChart filter={"Ocio"} />

                    </Row>
                  </Container>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin"></i>
                    Datos actualizados a diario
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
