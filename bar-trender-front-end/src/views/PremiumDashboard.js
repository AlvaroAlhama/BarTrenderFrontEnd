import React from "react";

// react-bootstrap components
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import ShowPremiumStats from "../components/ShowPremiumStats.js";

export default class PremiumDashboard extends React.Component {
  constructor() {
    super();

    this.state = {

      otherTags: [],

      zone: {
        zona: [],
      },

      types:[],

      sendFinal: {},

      modal1: false,
      errorsApiGet: {},
      errorsApiPut: {},
      errors: {},
      msg: undefined,
    };
    var query = window.location.search;
    let params = new URLSearchParams(query);
    this.zone = params.get("zone_enum");
    this.filter = params.get("filter");
    this.initialDate = params.get("initial-date");
    this.endDate = params.get("end-date");
    this.premium = null;
    this.getIsPremium();

    this.getTags();
    this.getZones();

  }

  async getTags() {
    var token = sessionStorage.getItem("token");

    const url = "https://bartrenderoficial.herokuapp.com/v1/establishments/get_tags";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
        apiKey: "8dDc431125634ef43cD13c388e6eCf11",
      },
    });
    const data = await response.json();

    var otherTags = data.tags.filter(tag => tag.type !== "Zona").map((tag) => {
      return { value: tag.name, label: tag.name };
    });

    var arrayOther = otherTags.filter(function (dato) {
      return dato !== undefined;
    });


    var temp_types = []
    for(var filter of data.tags)
    {
      if(!temp_types.includes(filter.type) && filter.type !== "Zona")
        temp_types.push(filter.type)
    }
    
    this.setState({
      zona: this.state.zone.zona,
      types: temp_types,
      otherTags: arrayOther,
    });
  }

  async getZones() {

    const url =
      "https://bartrenderoficial.herokuapp.com/v1/establishments/get_zones?all=true";
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      this.setState({
        zone: {
          otherTags: this.state.otherTags,
          zona: data.zones,
        },
      });
    }
  }
  async getIsPremium() {
    await fetch(
      "https://bartrenderoficial.herokuapp.com/v1/authentication/ispremium",
      {
        method: "GET",
        headers: {
          token: sessionStorage.getItem("token"),
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) =>
        this.premium = {
          premium: data.isPremium,
          premiumUntil: data.premiumUntil,
          remainingDays: data.premiumRemainingDays,
        }
      );
  }

  render() {
    if (sessionStorage.getItem("premium") === "true") {
      return (
        <>
          <Container fluid>
            <Row>
              <Col lg="6" md="6" xs="12">
                <Card className="p-4">
                  <h3 className="text-justify">
                    Bienvenido a la version premium de nuestro dashboard,
                    {this.premium == null ?
                    '' :
                    ' le quedan ' + this.premium.remainingDays + ' d??as de suscripci??n. '}
                  </h3>
                  

                </Card>
              </Col>

              <Col lg="6" md="6" xs="12">
                <Card className="p-4">
                  <form>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-xs-12">
                        <label className="container">Zona en la que buscar</label>
                      </div>

                      <div className='col-lg-8 col-md-6 col-xs-12'>
                        <select 
                          name='zone_enum' 
                          onChange={this.handleChange} 
                           className='form-control'>

                          {this.state.zone.zona.map((zona) => {
                            return <option value={zona}>{zona}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-xs-12">
                        <label className="container">Filtros</label>
                      </div>
                      <div className="col-lg-8 col-md-6 col-xs-12">
                        <select
                          className="form-control"
                          id="filterImput"
                          name="filter"
                        >
                          {this.state.types.map((type) => {
                            return <option value={type}>{type}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                    {window.innerWidth < 1300 && (
                      <>
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-xs-12">
                            <label className="container">Fecha inicial</label>
                          </div>
                          <div className="col-lg-8 col-md-6 col-xs-12">
                            <input
                              className="form-control"
                              id="initialDate"
                              type="date"
                              name="initial-date"
                            ></input>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-xs-12">
                            <label className="container">Fecha final</label>
                          </div>
                          <div className="col-lg-8 col-md-6 col-xs-12">
                            <input
                              className="form-control"
                              id="endDate"
                              type="date"
                              name="end-date"
                            ></input>
                          </div>
                        </div>
                      </>
                    )}
                    {window.innerWidth >= 1300 && (
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-xs-12">
                          <label className="container">Fecha inicial</label>
                          <input
                            className="form-control"
                            id="initialDate"
                            type="date"
                            name="initial-date"
                          ></input>
                        </div>
                        <div className="col-lg-6 col-md-6 col-xs-12">
                          <label className="container">Fecha final</label>
                          <input
                            className="form-control"
                            id="endDate"
                            type="date"
                            name="end-date"
                          ></input>
                        </div>
                      </div>
                    )}
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
