import React, { useEffect, useState, Component} from 'react';
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
import "../views/css/FreeDashboard.css";
function DashboardQRList(props) {
  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const { element } = props;
  const [appState, setAppState] = useState({
    discounts: {},
  });

   useEffect(() => {
    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/"+"1"+"/discounts/get?page=1&all=True";
    async function loadDiscounts(){
      await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apiKey':'8dDc431125634ef43cD13c388e6eCf11',
          'token': '',

        },
        
      }).then(response => response.json())
        .then(discounts => {
          setAppState({ discounts: discounts });
        });} 
        loadDiscounts()
  },[setAppState]);
console.log(appState)
var count = 0


 
  if (!appState.discounts.results || appState.discounts.count == 0) return (
    <Card>
  <h3>No tiene descuentos, le gustaria crear alguno?</h3>
  <button className="discounts"> Crear Descuentos</button>
  </Card>
  );
  return (
    

    <ul className="ul-flex">
      <h2 className='list-head'>Tus Descuentos</h2>
      <Row className='list'>
     
        {appState.discounts.results.map((discounts) => {
          return (
            <>
            
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
                      <p className="card-category">El descuento {discounts.name_text} fue canjeado por</p>
                      <Card.Title as="h4">{discounts.scannedCodes_number} usuarios</Card.Title>
                      <span hidden> {count= count+discounts.scannedCodes_number }</span>
                    </div>
                  </Col>
                </Row>
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
                      <p className="card-category">Numero de usuarios que han canjeado los descuentos que tiene en activo</p>
                      <Card.Title as="h4">{count}</Card.Title>
                    </div>
                  </Col>
                </Row>
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
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total a pagar por los descuentos escaneados</p>
                      <Card.Title as="h4">7,90€</Card.Title>
                    </div>
                    <div className = "row justify-content-center">
                  <button className="btn btn-primary">Pagar descuentos</button>
                  </div>
                  </Col>
                </Row>
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
    </ul>


  )
}




















     
  
  export default DashboardQRList;

       {/*
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
        </Col>*/}

  {/*<Row>
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
        */}