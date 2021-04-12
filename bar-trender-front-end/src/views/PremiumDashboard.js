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
import ShowPremiumStats from "../components/ShowPremiumStats.js"

function PremiumDashboard() {

    var token = sessionStorage.getItem("token");
   
    var query = window.location.search;
    let params = new URLSearchParams(query);
    var zone = params.get("zone");
    var filter = params.get("filter");
    
      {
          //Añadir requerimiento del boolean premium, modificar este if
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
        <Col md="6">
          <Card>
         
            <h3>Bienvenido a la version premium de nuestro dashboard, tu suscripción 
              tiene una duración de 24 dias
            </h3>
         
          </Card>
          </Col>

          <Col md="6">
          <Card>
         
          <form>
            <h3>  Zona en la que quieres buscar(deje en blanco para las estadisticas generales):</h3>
            <label class="container">
              <br/>
              <input class = "textimput" type="text" name="zone" />
            </label>
            <br/>
           <h3 class = "center">Filtros</h3>
           <select  class = "filterimput" id="filterImput" name="filter">
            <option value="Bebida">Bebida</option>
            <option value="Instalacion">Instalacion</option>
            <option value="Ocio">Ocio</option>
          </select>
            <br/>
            <br/>
            <input  className="btn btn-primary" type="submit" value="Buscar" />
          </form>
         
          </Card>
          </Col>

        </Row>
        
        <Row>
       
            <ShowPremiumStats zone= {zone} filter = {filter} />


           
          
        </Row>
 
       
        </Container>
    </>
  );
}
}
export default PremiumDashboard;