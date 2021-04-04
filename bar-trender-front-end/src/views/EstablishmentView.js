import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import POSTCreateDiscount from "../components/ApiCreateDiscountForm";
import ModalDeleteDiscount from "../components/Modals/ModalDeleteDiscount";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  OverlayTrigger,
  Tooltip,
  Table,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ModalUpdateDiscount from "components/Modals/ModalUpdateDiscount";

function EstablishmentView() {
  const [appState, setAppState] = useState({
    loading: false,
    establishment: {},
    discounts: [],
  });

  const [modal1, setModal1] = React.useState(false);
  const [modalDelete, setModalDelete] = React.useState(false);

  const idEstablishment = () => {
    var query = window.location.pathname;
    var splited = query.split("/");
    var idEstablishment = splited[3];

    return idEstablishment;
  };
  const id_establishment = idEstablishment();

  useEffect(() => {
    setAppState({ loading: true });
    var token = sessionStorage.getItem("token");

    fetch(
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
        id_establishment +
        "/get",
      {
        method: "GET",
        headers: {
          token: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAppState({
          loading: false,
          establishment: data.establishment,
          discounts: data.discounts,
        });
      });
  }, [setAppState]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title className="ml-3 mt-3" as="h2">
                  Detalles del establecimiento
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Establecimiento</label>
                        <Form.Control
                          defaultValue={
                            appState.establishment == undefined
                              ? ""
                              : appState.establishment.name
                          }
                          placeholder="Nombre del establecimiento"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="5">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Correo electrónico
                        </label>
                        <Form.Control
                          placeholder="-correoElectrónicoOwner"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Zona</label>
                        <Form.Control
                          defaultValue={
                            appState.establishment == undefined
                              ? ""
                              : appState.establishment.zone
                          }
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Ciudad</label>
                        <Form.Control
                          defaultValue="Sevilla"
                          placeholder="Ciudad"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>País</label>
                        <Form.Control
                          defaultValue="España"
                          placeholder="País"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Código Postal</label>
                        <Form.Control
                          placeholder="-códigoPostalEstablishment"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Sobre el establecimiento</label>
                        <Form.Control
                          cols="80"
                          defaultValue=""
                          placeholder="Aquí una descripción del establecimiento"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Editar Perfil
                  </Button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setModal1(true)}
                  >
                    Añadir Descuento
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
                      <h4 className="title title-up">Nuevo descuento</h4>
                    </div>
                    <div class="container">
                      <hr />
                    </div>
                    <ModalBody>
                      <POSTCreateDiscount />
                    </ModalBody>
                  </Modal>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={
                    require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg").default}
                    ></img>
                    <h5 className="title">-OwnerName</h5>
                  </a>
                  <p className="description">-OwnerEmail</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title className="ml-3 mt-3" as="h2">
                  Descuentos activos
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <div class="establsihment-discounts">
                  {appState.establishment == undefined
                    ? ""
                    : appState.discounts.map((discount) => {
                        var edit = true;
                        const isTotalScannedCode =
                          discount.totalCodes == discount.scannedCodes;
                        var today = new Date();
                        const isExpiredDate = discount.endDate > today;

                        const canDelete = discount.scannedCodes <= 0;
                        if (isTotalScannedCode || isExpiredDate) {
                          edit = false;
                        }
                        return (
                          <>
                            <Table>
                              <tbody>
                                <tr>
                                  <td>
                                    {discount.name} / {discount.description}
                                  </td>
                                  <td>
                                    {discount.scannedCodes} / {discount.totalCodes}
                                  </td>
                                  <td className="td-actions text-right">
                                    {edit && (
                                      <ModalUpdateDiscount
                                        discount={discount}
                                      />
                                    )}
                                    {canDelete && (
                                    <ModalDeleteDiscount discount={discount} />
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </>
                        );
                      })}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EstablishmentView;
