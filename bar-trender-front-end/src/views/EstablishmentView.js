import React, { useEffect, useState } from "react";
import EditEstablishment from '../components/EditEstablishment.js'
import EditDeleteDiscounts from '../components/EditDeleteDiscounts';
import * as uuid from 'uuid';
// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";


function EstablishmentView() {
  const [appState, setAppState] = useState({
    loading: false,
    establishment: {},
    discounts: [],
    error: false,
  });

  const idEstablishment = () => {
    var query = window.location.pathname;
    var splited = query.split("/");
    var idEstablishment = splited[3];

    return idEstablishment;
  };
 
  useEffect(() => {

    const id_establishment = idEstablishment();

    setAppState({ loading: true });
    var token = sessionStorage.getItem("token");

    fetch(
      "https://bartrenderoficial.herokuapp.com/v1/establishments/" +
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
        if (data['error'] === undefined) {
          setAppState({

            loading: false,
            establishment: data.establishment,
            discounts: data.discounts,
          });
        } else {
          setAppState({
            loading: false,
            error: true,
            erorr_info: data.error,

          });
        
        }

      });
  }, [setAppState]);

  if (appState.error === true) {
    return (
      <Container fluid>
        <h1>Error</h1>

        <h2> {appState.erorr_info}</h2>

      </Container>
    );
  } else {
    return (

      <>
        <Container fluid>
          <EditEstablishment key={uuid.v4()}/>
        </Container>
        <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title className="ml-3 mt-3" as="h2">
                  Mis Descuentos
                </Card.Title>
              </Card.Header>
              <Card.Body>
                  <EditDeleteDiscounts key={uuid.v4()}/>
              </Card.Body>
            </Card>
          </Col>
        </Row> 
        </Container>
      </>
    );
  }

}

export default EstablishmentView;