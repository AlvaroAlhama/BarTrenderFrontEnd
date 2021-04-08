import React, { useEffect, useState, Component } from "react";
import { Modal, ModalBody } from "reactstrap";

import { Card, Container, Row, Col } from "react-bootstrap";
import "../views/css/FreeDashboard.css";
function DashboardQRList(props) {
  const [modal1, setModal1] = React.useState(false);
  const { element } = props;
  var idEstablishment = props.idEstablishment;
  const [appState, setAppState] = useState({
    discounts: {},
  });

  useEffect(() => {
    const apiUrl =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
      idEstablishment +
      "/discounts/get?page=1&all=True";
    async function loadDiscounts() {
      await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apiKey: "8dDc431125634ef43cD13c388e6eCf11",
          token: "",
        },
      })
        .then((response) => response.json())
        .then((discounts) => {
          setAppState({ discounts: discounts });
        });
    }
    loadDiscounts();
  }, [setAppState]);

  var count = 0;

  if (!appState.discounts.results || appState.discounts.count == 0) {
    return (
      <Card>
        <h3>No tiene descuentos, le gustaria crear alguno?</h3>
        <button className="btn btn-primary"> Crear Descuentos</button>
      </Card>
    );
  } else {
    var totalPriceDiscounts = 0;
    for (var discount of appState.discounts.results) {
      totalPriceDiscounts +=
        discount.scannedCodes_number * discount.cost_number;
    }

    return (
      <ul className="ul-flex">
        <h2 className="list-head">Tus Descuentos</h2>
        <Container fluid>
          <Row className="list">
            {appState.discounts.results.map((discounts) => {
              return (
                <>
                  <Col lg="4" md="6" xs="12">
                    <Card className="card-stats">
                      <Card.Body>
                        <Container fluid>
                          <Row className="justify-content-center">
                            <div className="icon-big text-center icon-warning">
                              <i className="nc-icon nc-chart text-warning"></i>
                            </div>
                          </Row>
                          <Row className="justify-content-center">
                            <div className="numbers text-center">
                              <p className="card-category">
                                El descuento {discounts.name_text} fue canjeado
                                por
                              </p>
                              <Card.Title as="h4">
                                {discounts.scannedCodes_number} usuarios
                              </Card.Title>
                              <span hidden>
                                {" "}
                                {
                                  (count =
                                    count + discounts.scannedCodes_number)
                                }
                              </span>
                            </div>
                          </Row>
                        </Container>
                      </Card.Body>
                      <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                          <i className="fas fa-redo mr-1"></i>
                          Datos extraidos de la api de Bartrender
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                </>
              );
            })}
            <Col lg="4" md="6" xs="12">
              <Card className="card-stats">
                <Card.Body>
                  <Container fluid>
                    <Row className="justify-content-center">
                      <div className="icon-big icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary"></i>
                      </div>
                    </Row>
                    <Row classname="justify-content-center">
                      <div className="numbers text-center">
                        <p className="card-category">
                          Número de usuarios que han canjeado los descuentos que
                          tiene en activo
                        </p>
                        <Card.Title as="h4">{count} usuarios</Card.Title>
                      </div>
                    </Row>
                  </Container>
                </Card.Body>
                <Card.Footer>
                  <hr></hr>
                  <div className="stats">
                    <i className="fas fa-redo mr-1"></i>
                    Datos extraidos de la api de Bartrender
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>

          <Row>
            <Card className="card-stats">
              <Card.Body>
                <Container fluid>
                  <Row className="justify-content-center">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </Row>
                  <Row className="justify-content-center">
                    <Container fluid>
                      <div className="numbers text-center">
                        <p className="card-category">
                          Total a pagar por los descuentos escaneados
                        </p>
                        <Card.Title as="h4">{totalPriceDiscounts}</Card.Title>
                      </div>
                      <div className="row justify-content-center">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setModal1(true);
                          }}
                        >
                          Pagar descuentos
                        </button>
                        <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                          <div className="modal-header justify-content-center">
                            <button
                              className="close"
                              type="button"
                              onClick={() => setModal1(false)}
                            >
                              <i className="now-ui-icons ui-1_simple-remove"></i>
                            </button>
                            <h4 className="title title-up">
                              Total de descuentos
                            </h4>
                          </div>
                          <div class="container">
                            <hr />
                          </div>
                          <ModalBody>
                            <Container fluid>
                              <Row>
                                <Col className="col-5">
                                  <p className="font-weight-bold">Nombre Descuento</p>
                                </Col>
                                <Col className="col-3"> 
                                  <p className="font-weight-bold text-center">Precio Descuento</p>
                                </Col>
                                <Col className="col-2">
                                  <p className="font-weight-bold text-center">Total Códigos</p>
                                </Col>
                                <Col className="col-2">
                                  <p className="font-weight-bold text-center">
                                    Precio total
                                  </p>
                                </Col>
                              </Row>
                              <hr></hr>
                              {appState.discounts.results.map((discounts) => {
                                return (
                                  <>
                                    <Row>
                                      <Col className="col-5" >
                                        <p className="font-weight-light">
                                          {discounts.name_text}
                                        </p>
                                      </Col>
                                      <Col className="col-3">
                                        <p className="font-weight-light text-center">
                                          {discounts.cost_number}
                                        </p>
                                      </Col>
                                      <Col className="col-2">
                                        <p className="font-weight-light text-center">
                                          {discounts.scannedCodes_number}
                                        </p>
                                      </Col>
                                      <Col className="col-2">
                                        <p className="font-weight-light text-center">
                                          {discounts.scannedCodes_number *
                                            discounts.cost_number}
                                        </p>
                                      </Col>
                                    </Row>
                                  </>
                                );
                              })}
                              <hr></hr>
                              <Row>
                                
                                <Col className="col-5">
                                  <p className="font-weight-bold">TOTAL</p>
                                </Col>
                                <Col  className="col-3">
                                </Col>
                                <Col  className="col-2">
                                </Col>
                                <Col className="col-2">
                                  <p className="font-weight-bold text-center">
                                    {totalPriceDiscounts}
                                  </p>
                                </Col>
                              </Row>
                            </Container>
                          </ModalBody>
                        </Modal>
                      </div>
                    </Container>
                  </Row>
                </Container>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Datos extraidos de la api de Bartrender
                </div>
              </Card.Footer>
            </Card>
          </Row>
        </Container>
      </ul>
    );
  }
}

export default DashboardQRList;

{
  /*
          //Esto se debe convertir en una lista que por cada descuento que tenga 
        //este local muestre el numero de veces que se ha usado este qr en una tarjeta como esta
        <Col lg="3" sm="6">
        <Card className="card-stats">
          <Card.Body>
            <Row>
              {/* Por si se quiere añadir imagenes
              <Col xs="5">
                <div className="icon-big text-center icon-warning">
                  <i className="nc-icon nc-chart text-warning"></i>
                </div>
                </Col>
              <Col xs="7">
                <div className="numbers">
                  <p className="card-category">El descuento "2x1 en cervezas" ha sido canjeado por</p>
                  <Card.Title as="h4">"147" usuarios</Card.Title>
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <hr></hr>
            <div className="stats">
              {/*Por si se quiere añadir un boton de acualizar o un boton de de premium
              <i className="fas fa-redo mr-1"></i>
              Pasate a premium para mas detalles
            </div>
          </Card.Footer>
        </Card>
        </Col>*/
}

{
  /*<Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number</p>
                      <Card.Title as="h4">150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
        
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <Card.Title as="h4">+45K</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        */
}
