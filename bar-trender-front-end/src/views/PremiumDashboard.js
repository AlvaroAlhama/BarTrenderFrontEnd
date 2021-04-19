import Select from "react-select";
import { Modal, ModalBody } from "reactstrap";
import POSTCreateDiscount from "../components/ApiCreateDiscountForm";

import React, { useEffect, useState, Component } from "react";
import ChartistGraph from "react-chartist";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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

import DashboardTopImage from "../components/DashboardTopImage";
import FreePieChart from "../components/FreePieChart.js";
import PremiumBarChart from "../components/PremiumBarChart.js";
import ShowPremiumStats from "../components/ShowPremiumStats.js";

export default class PremiumDashboard extends React.Component {
  constructor() {
    super();

    this.state = {

      otherTags: [],

      zone: {
        zona: [],
      },

      sendFinal: {},

      modal1: false,
      errorsApiGet: {},
      errorsApiPut: {},
      errors: {},
      msg: null,
    };
    var query = window.location.search;
    let params = new URLSearchParams(query);
    this.zone = params.get("zone_enum");
    this.filter = params.get("filter");
    this.initialDate = params.get("initial-date");
    this.endDate = params.get("end-date");

    this.getTags();
  }

  async getTags() {
    var token = sessionStorage.getItem("token");

    const url = "https://main-backend-sprint-02.herokuapp.com/v1/establishments/get_tags";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
        apiKey: "8dDc431125634ef43cD13c388e6eCf11",
      },
    });
    const data = await response.json();

    var otherTags = data.tags.map((tag) => {
      if (tag.type != "Zona") {
        return { value: tag.name, label: tag.name };
      }
    });

    var arrayOther = otherTags.filter(function (dato) {
      return dato != undefined;
    });

    const tagZone = data.tags.map((tag) => {
      if (tag.type == "Zona") {
        return tag.name;
      }
    });

    var array = tagZone.filter(function (dato) {
      return dato != undefined;
    });

    this.setState({
      otherTags: arrayOther,

      zone: {
        zona: array,
      },
    });
  }

  render() {
    console.log("AQUI PREMIUM");
    console.log(sessionStorage.getItem("premium"));
    if (sessionStorage.getItem("premium") == "true") {
      return (
        <>
          <Container fluid>
            <Row>
              <Col lg="6" md="6" xs="12">
                <Card className="p-4">
                  <h3 class="text-justify">
                    Bienvenido a la version premium de nuestro dashboard,
                    ¿Quiere revisar su suscripción?
                  </h3>
                  <Link to="/admin/upgrade" className="btn btn-primary">
                    Revisar Suscripción
                  </Link>
                </Card>
              </Col>

              <Col lg="6" md="6" xs="12">
                <Card className="p-4">
                  <form>
                    <div class="row">
                      <div class="col-lg-4 col-md-6 col-xs-12">
                        <label class="container">Zona en la que buscar</label>
                      </div>
                      <div class='col-lg-8 col-md-6 col-xs-12'>
                        <select 
                          name='zone_enum' 
                          onChange={this.handleChange} 
                           class='form-control'>
                          {this.state.zone.zona.map((zona) => {
                            return <option value={zona}>{zona}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-4 col-md-6 col-xs-12">
                        <label class="container">Filtros</label>
                      </div>
                      <div class="col-lg-8 col-md-6 col-xs-12">
                        <select
                          class="form-control"
                          id="filterImput"
                          name="filter"
                        >
                          <option value="Bebida">Bebida</option>
                          <option value="Instalacion">Instalacion</option>
                          <option value="Ocio">Ocio</option>
                        </select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-xs-12">
                        <label class="container">Fecha inicial</label>
                        <input
                          class="form-control"
                          id="initialDate"
                          type="date"
                          name="initial-date"
                        ></input>
                      </div>
                      <div class="col-lg-6 col-md-6 col-xs-12">
                        <label class="container">Fecha final</label>
                        <input
                          class="form-control"
                          id="endDate"
                          type="date"
                          name="end-date"
                        ></input>
                      </div>
                    </div>

                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Buscar"
                    />
                  </form>
                </Card>
              </Col>

              <Col lg="12" md="12" xs="12">
                <ShowPremiumStats
                  zone={this.zone}
                  filter={this.filter}
                  initialDate={this.initialDate}
                  endDate={this.endDate}
                />
              </Col>
            </Row>

          </Container>
        </>
      );
    } else {
      return (
        <Container fluid>
          <h1> Necesitas ser usuario premium para poder acceder a la vista</h1>
        </Container>
      );
    }
  }
}
