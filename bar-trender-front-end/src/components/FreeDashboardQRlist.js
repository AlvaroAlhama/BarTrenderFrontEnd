import React, { useEffect, useState} from "react";
import { Modal, ModalBody } from "reactstrap";

import { Card, Container, Row, Col, Table } from "react-bootstrap";
import "../views/css/FreeDashboard.css";
import '../views/css/Dashboard.css';

import ReactDOM from "react-dom";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function DashboardQRList(props) {
  const [modal1, setModal1] = React.useState(false);
  var idEstablishment = props.idEstablishment;
  var nameEstablishment = props.nameEstablishment;
  var token = sessionStorage.getItem("token");
  const [appState, setAppState] = useState({
    discounts: {},
  });
  const [paymentState] = useState({
    create_time: null,
    order_id: null
  });
  const [discountPaymentInfoState, setDiscountPaymentInfoState] = useState({
    discountPaymentInfo: {},
  });

  useEffect(() => {
      const apiUrl =
        "https://develop-backend-sprint-01.herokuapp.com/v1/payments/establishments/" +
        idEstablishment +
        "/calculate";
      async function loadDiscountPaymentInfo() {
        await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apiKey: "8dDc431125634ef43cD13c388e6eCf11",
            token: token,
          },
        })
          .then((response) => response.json())
          .then((discountPaymentInfo) => {
            setDiscountPaymentInfoState({ discountPaymentInfo: discountPaymentInfo });
          });
      }
      loadDiscountPaymentInfo();
    }, [setDiscountPaymentInfoState, idEstablishment, token]);

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
  }, [setAppState, idEstablishment]);

  

 
  var count = 0;

  if (!appState.discounts.results || appState.discounts.count === 0) {
    return (
      <Card>
        <h3>No tiene descuentos para el establecimiento: {nameEstablishment}</h3> 
      </Card>
    );
  } else {
    var totalPriceDiscounts = discountPaymentInfoState.discountPaymentInfo.total === undefined?0.0:discountPaymentInfoState.discountPaymentInfo.total.toFixed(2);
    

    const createOrder = (data, actions) =>{
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: String(totalPriceDiscounts),
            },
          },
        ],
      });
    }
  
    const onApprove = (data, actions) => {
      return actions.order.capture().then(function(details){
        paymentState.create_time = details.create_time;
        paymentState.order_id = details.id;
        payment();
      });
    }

    const paymentUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/payments/establishments/"+idEstablishment+"/pay";

    const payment = () => {
      if(paymentState.create_time !== null && paymentState.order_id !== null){
          fetch(paymentUrl, {
            method: "POST",
            headers: {
              token: token,
              "Content-type": "application/json",
            },
            body: JSON.stringify(paymentState),
          }).then(response => {
            window.location.reload()
          });
        }
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
                        {/* <Container fluid> */}
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
                        {/* </Container> */}
                      </Card.Body>
                      <Card.Footer>
                        <hr></hr>
                        <div className="stats">
                          <i className="fas fa-check"></i>
                          Datos extraidos de la api de Bartrender
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                </>
              );
            })}
            <Col lg="4" md="6" xs="12">
              <Card className="card-stats flex">
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
                    <i className="fas fa-check"></i>
                    Datos extraidos de la api de Bartrender
                  </div>
                </Card.Footer>
              </Card>
            </Col>

          <Col lg="12" md="12" xs="12">
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
                          <div className="container">
                            <hr />
                          </div>
                          <ModalBody>
                            <Container fluid>
                              <Table className="text-center overflow-auto ">
                                <thead>
                                  <tr>
                                    <th
                                      className="font-weight-bold text-center"
                                      scope="col-5"
                                    >
                                      Nombre Descuento
                                    </th>
                                    <th></th>
                                    <th
                                      className="font-weight-bold text-center"
                                      scope="col-5"
                                    >
                                      Total Códigos
                                    </th>
                                    <th></th>
                                    <th
                                      className="font-weight-bold text-center"
                                      scope="col-5"
                                    >
                                      Precio total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {discountPaymentInfoState.discountPaymentInfo.payments !== undefined?
                                  discountPaymentInfoState.discountPaymentInfo.payments.map(
                                    (payments) => {
                                      return (
                                        <>
                                          <tr>
                                            <td className="text-left">
                                              {payments.discount_name}
                                            </td>
                                            <td></td>
                                            <td>{payments.payment_scanned_codes}</td>
                                            <td></td>
                                            <td>{payments.value}€</td>
                                          </tr>
                                        </>
                                      );
                                    }
                                  ):<p>loading</p>}
                                  <tr>
                                    <th scope="row">TOTAL</th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <th scope="row">{totalPriceDiscounts}€</th>
                                  </tr>
                                </tbody>
                              </Table>
                              <PayPalButton
                              createOrder={(data, actions) => createOrder(data, actions)}
                               onApprove={(data, actions) => onApprove(data, actions)}
                              />
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
                  <i className="fas fa-check"></i>
                  Datos extraidos de la api de Bartrender
                </div>
              </Card.Footer>
            </Card>
          </Col>
          </Row>
        </Container>
      </ul>
    );
  }
}

export default DashboardQRList;