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
  var idEstablishment = props.idEstablishment;
  const [appState, setAppState] = useState({
    discounts: {},
  });

   useEffect(() => {
    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/"+idEstablishment+"/discounts/get?page=1&all=True";
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

var count = 0


 
  if (!appState.discounts.results || appState.discounts.count == 0) return (
    <Card>
  <h3>No tiene descuentos, le gustaria crear alguno?</h3>
  <button className="btn btn-primary"> Crear Descuentos</button>
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

      
