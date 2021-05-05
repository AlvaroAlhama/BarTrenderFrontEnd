import React, { useEffect, useState } from "react";

// react-bootstrap components
import { Card, Table, Container, Row, Col } from "react-bootstrap";

import ReactDOM from "react-dom";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function Upgrade() {
  const [appState] = useState({
    create_time: undefined,
    order_id: undefined,
  });

  const [isPremium, setIsPremium] = useState({});
  const [modalApiSuccess, setModalApiSuccess] = useState(false);

  var token = sessionStorage.getItem("token");

  useEffect(() => {
    async function getIsPremium() {
      await fetch(
        "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/ispremium",
        {
          method: "GET",
          headers: {
            token: sessionStorage.getItem("token"),
            "Content-type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) =>
          setIsPremium({
            premium: data.isPremium,
            premiumUntil: data.premiumUntil,
            remainingDays: data.premiumRemainingDays,
          })
        );
    }
    getIsPremium();
  }, []);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "7.99",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      appState.create_time = details.create_time;
      appState.order_id = details.id;
      payment();
    });
  };

  const url =
    "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/setpremium";

  const payment = () => {
    if (appState.create_time !== undefined && appState.order_id !== undefined) {
      fetch(url, {
        method: "POST",
        headers: {
          token: token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(appState),
      }).then((response) => {
        response.json();
        setModalApiSuccess(true);
        sessionStorage.setItem("premium", "true");
      });
    }
  };

  return (
    <>
      {isPremium === undefined ? (
        <Spinner />
      ) : (
        <Container fluid>
          <Row>
            <Col className="ml-auto mr-auto" md="8">
              <Card>
                <div className="header text-center">
                  <h4 className="title">
                    Diferencias entre la versión gratuita y premium de
                    BarTrender
                  </h4>
                  <p className="text-center">
                    ¿Estás buscando información más específica a cerca de las
                    búsquedas de los consumidores?
                  </p>
                  <p className="text-center">
                    ¡Compra nuestra versión premium por tan solo 7.99€ al mes y
                    disfruta de todas sus ventajas!
                  </p>
                  <br></br>
                </div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-center">Gratuita</th>
                      <th className="text-center">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Numeros de rankings</td>
                      <td>2</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td>Resultados de rankings</td>
                      <td>3</td>
                      <td>5+</td>
                    </tr>
                    <tr>
                      <td>Estadisticas por zona</td>
                      <td>
                        <i className="fas fa-times text-danger"></i>
                      </td>
                      <td>
                        <i className="fas fa-check text-success"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Estadisticas por fechas</td>
                      <td>
                        <i className="fas fa-times text-danger"></i>
                      </td>
                      <td>
                        <i className="fas fa-check text-success"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>Estadisticas a tiempo real</td>
                      <td>
                        <i className="fas fa-times text-danger"></i>
                      </td>
                      <td>
                        <i className="fas fa-check text-success"></i>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Gratis</td>
                      <td>7.99€/mes</td>
                    </tr>

                    {window.innerWidth >= 550 && (
                    <tr className="last-row">
                      <td></td>
                      <td>Ya disfrutas de este contenido</td>
                      <td>
                        <>
                          {isPremium.remainingDays <= 1 ||
                          isPremium.premium === false ? (
                            <>
                              {isPremium.premium === false ? (
                                ""
                              ) : (
                                <p className="text-danger">
                                  Te queda menos de un día de BarTrenderPremium
                                </p>
                              )}
                              <PayPalButton
                                id="paypal-button"
                                createOrder={(data, actions) =>
                                  createOrder(data, actions)
                                }
                                onApprove={(data, actions) =>
                                  onApprove(data, actions)
                                }
                                style={{
                                  size: 'small',
                                  color: 'gold',
                                  label: 'checkout',
                                }}
                              />
                            </>
                          ) : (
                            <>
                              Te quedan{" "}
                              <b>
                                {isPremium.remainingDays} día/s de BarTrender
                                Premium
                              </b>
                            </>
                          )}
                        </>
                      </td>
                    </tr>)}
                  </tbody>
                </Table>

                {window.innerWidth < 550 && (
                  <div className="text-center">
                    <p>Ya disfrutas del contenido gratuito</p>
                      
                      <>
                      {isPremium.remainingDays <= 1 ||
                      isPremium.premium === false ? (
                        <>
                          {isPremium.premium === false ? (
                            ""
                          ) : (
                            <p className="text-danger">
                              Te queda menos de un día de BarTrenderPremium
                            </p>
                          )}
                          <p>Paga 7.99 €/mes para ser usuario premium</p>
                          <PayPalButton
                            id="paypal-button"
                            createOrder={(data, actions) =>
                              createOrder(data, actions)
                            }
                            onApprove={(data, actions) =>
                              onApprove(data, actions)
                            }
                            style={{
                              size: 'small',
                              color: 'gold',
                              label: 'checkout',
                            }}
                          />
                        </>
                      ) : (
                        <>
                          Te quedan{" "}
                          <b>
                            {isPremium.remainingDays} día/s de BarTrender
                            Premium
                          </b>
                        </>
                      )}
                    </>
                  </div>)}
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      <Modal isOpen={modalApiSuccess} toogle={() => setModalApiSuccess(false)}>
        <ModalHeader className="justify-content-center ">
          <button
            className="close"
            type="button"
            onClick={() => window.location.reload()}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h4 className="title title-up">Resultado</h4>
        </ModalHeader>
        <ModalBody>
          <div>
            <div className="row justify-content-center">
              <h5 className="text-success">Pago realizado con éxito</h5>
            </div>
            <div className="row justify-content-center">
              <p>
                <b>¡Gracias por confiar en BartTrender!</b>
              </p>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Upgrade;
