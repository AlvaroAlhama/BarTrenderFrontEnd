import React, { useEffect, useState, Component } from "react";
import ChartistGraph from "react-chartist";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
    var initialDate = params.get("initial-date");
    var endDate = params.get("end-date");

    const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const [appState, setAppState] = useState({
    user: {},
  });
  var token = sessionStorage.getItem("token");
  useEffect(() => {
    const apiUrl =
      "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/user";
    async function loadBar() {
      await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apiKey: "8dDc431125634ef43cD13c388e6eCf11",
          token: token,
        },
      })
        .then((response) => response.json())
        .then((user) => {
          setAppState({ user: user });
        });
    }
    loadBar();
  }, [setAppState]);



      {
          //Añadir requerimiento del boolean premium, modificar este if
      }
     if (sessionStorage.getItem("premium") == true) {
      return(
        <Container fluid>

          <Row>
            <Col md="6">
              <Card>

                <h3>Bienvenido a la version premium de nuestro dashboard, ¿Quiere revisar su suscripción?
            </h3>
                <Link to="/admin/upgrade" className="btn btn-primary">Revisar Suscripción</Link>


              </Card>
            </Col>

            <Col md="6">
              <Card>

                <form>
                  <div class="row">
                    <div class="col-col-lg-4">
                      <label class="container" >Zona en la que buscar</label>
                    </div>
                    <div class='col pr-1 md-6'>
                      <input class="form-control" type="text" name="zone" />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <label class="container" >Filtros</label>
                    </div>
                    <div class='col pr-1 md-6'>
                      <select class="form-control" id="filterImput" name="filter">
                        <option value="Bebida">Bebida</option>
                        <option value="Instalacion">Instalacion</option>
                        <option value="Ocio">Ocio</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col pl-1 sm-1">
                    </div>
                    <div class="col pl-1 md-6">
                      <label class="container" >Fecha inicial</label>
                      <input class="form-control" id="initialDate" type="date" name="initial-date"></input>
                    </div>
                    <div class='col pr-1 md-6'>
                      <label class="container" >Fecha final</label>
                      <input class="form-control" id="endDate" type="date" name="end-date"></input>
                    </div>
                    <div class="col pr-1 sm-1">
                    </div>
                  </div>


                  <input className="btn btn-primary" type="submit" value="Buscar" />
                </form>

              </Card>
            </Col>

          </Row>

          <Row>

            <ShowPremiumStats zone={zone} filter={filter} initialDate={initialDate} endDate={endDate} />




          </Row>


        </Container>
      </>
    );
  } else {
    return (
      <Container fluid>
        <h1> Necesitas ser  usuario premium para poder acceder a la vista</h1>
      </Container>
    );
   
  }
}
export default PremiumDashboard;