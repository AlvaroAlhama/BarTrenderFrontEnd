import React,  { useEffect, useState, Component} from "react";
import ChartistGraph from "react-chartist";
// react-bootstrap components
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


import DashboardTopImage from "../components/DashboardTopImage"
import FreePieChart from "../components/FreePieChart.js";
import PremiumBarChart from "../components/PremiumBarChart.js"

function PremiumDashboard() {

    var token = sessionStorage.getItem("token");
   
    
      {
          //Añadir requerimiento del boolean premium
      }
     if(!token){
      return(
        <Container fluid>
          <h1> Necesitas ser  usuario premium para poder acceder a la vista</h1>
        </Container>
      );
    }else{

       return (
    <>
      <Container fluid>

        <Row>
          
            <Card  style={{width:"80%", height:"60%"}}>
              <Card.Body>
              
              <PremiumBarChart filter = {"Bebida"}/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin"></i>
                  Datos obtenidos de la api de Bartrender
                </div>
              </Card.Footer>
            </Card>
          
        </Row>
        <Row>
          
          <Card  style={{width:"80%", height:"60%"}}>
            <Card.Body>
            
            <PremiumBarChart filter = {"Ocio"}/>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="now-ui-icons loader_refresh spin"></i>
                Datos obtenidos de la api de Bartrender
              </div>
            </Card.Footer>
          </Card>
        
      </Row>

      <Row>
          
          <Card  style={{width:"80%", height:"60%"}}>
            <Card.Body>
            
            <PremiumBarChart filter = {"Instalacion"}/>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="now-ui-icons loader_refresh spin"></i>
                Datos obtenidos de la api de Bartrender
              </div>
            </Card.Footer>
          </Card>
        
      </Row>

       
        </Container>
    </>
  );
}
}
export default PremiumDashboard;