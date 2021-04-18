import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import POSTCreateDiscount from "../components/ApiCreateDiscountForm";
import ModalDeleteDiscount from "../components/Modals/ModalDeleteDiscount";
import EditEstablishment from '../components/EditEstablishment.js'

// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ModalUpdateDiscount from "components/Modals/ModalUpdateDiscount";


function EstablishmentView() {
  console.log("Llega");
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
          <EditEstablishment/>
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
                                    {discount.scannedCodes} /{" "}
                                    {discount.totalCodes}
                                  </td>
                                  <td className="td-actions text-right">
                                    {edit && (
                                      <ModalUpdateDiscount
                                        discount={discount}
                                      />
                                    )}
                                    {canDelete && (
                                      <ModalDeleteDiscount
                                        discount={discount}
                                      />
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
