import React, {useState} from "react";

// react-bootstrap components
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import ReactDOM from "react-dom";


const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function Upgrade() {

  const [appState, setAppState] = useState({
    create_time: null,
    id: null
  });

  var token = sessionStorage.getItem("token");

  const createOrder = (data, actions) =>{
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "7.99",
          },
        },
      ],
    });
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function(details){
 
      setAppState({create_time: details.create_time, order_id: details.id })
    });
  } 



  const url = "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/setpremium";

  if(appState != null){
  const setpremium =  
    fetch(url, {
    method: "POST",
    headers: {
      token: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify(appState),
  }).then(response => {
    sessionStorage.setItem("premium", "true")
  });
}

  return (
    
    <>
     
      <Container fluid>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <Card>
              <div className="header text-center">
                <h4 className="title">Diferencias entre la versión gratuita y premium de BarTrender</h4>
                <p className="text-center">
                  ¿Estás buscando información más específica a cerca de las búsquedas de los consumidores?
                </p>
                <p className="text-center">
                 ¡Compra nuestra versión premium por tan solo 7.99€ al mes y disfruta de todas sus ventajas!
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
                  <tr className="last-row">
                    <td></td>
                    <td>
                      <Button
                        className="btn-round btn-fill disabled"
                        onClick={(e) => e.preventDefault()}
                        variant="default"
                      >
                        Current Version
                      </Button>
                    </td>
                    <td>
                      <PayPalButton
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                        />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
     
  
    </>
  )
  }


export default Upgrade;
