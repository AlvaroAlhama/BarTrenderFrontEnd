
import React, { Component } from "react";

import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom"
import * as uuid from 'uuid';
// reactstrap components
import {
  Modal,
  ModalBody,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import POSTForm from "../ApiFormSubmit";
import NavPillsFilters from "../NavPillsFilters";

import image_0 from '../../assets/img/expositions/hU-kQ3Epxeq2dhaBpUgYfYaPhHEOKXnHXSeUqLjTygYBV05OHhUSZEWilh_Da9zkI1d_cgz91KIPevD_BBhBWhaKevognkx6Bv7-QwkQdRG9oznKG6wOae4avH8ksi6bkJBLWl4.png';
import image_left from '../../assets/img/expositions/hU-kQ3Epxeq2dhaBpUgYfYaPhHEOKXnHXSeUqLjTygYBV05OHhUSZEWilh_Da9zkI1d_cgz91KIPevD_BBhBWhaKevognkx6Bv7-QwkQdRG9oznKG6wOae4avH8ksi6bkJBLWl4.png';
import image_left_2 from "../../assets/img/expositions/Yn0xRl4G5E1eabgf9nyC9j6DVQVHd5DBNcPehVZwakLHYP-toRbW22a8kFesYK_taX0ZY_WviWVcT3bQ40tlKhaKSuAQAu6graIF.png";
import image_right from "../../assets/img/expositions/TR9IDnSgMV79XktfRCxesUmLacTZJI9fb3Cv3-aMamIGyWdL_OagKWYcJJAPqgm62bjW9I6yHlMsOhowVROsAUiNui0CGo-qmPU-.png";


class ModalSearch extends React.Component {

  constructor(props) {
    // const [pills, setPills] = React.useState("2");

    var tags = [
      {
        name: "Cruzcampo",
        type: "Bebida"
      },
    ]

    super(props);
    this.state = {
      modal: props.initialModalState,
      fade: true,

      Paulaner: "off",
      Triana: "off",
      Alameda: "off",
      Cruzcampo: "off",
      Dardos: "off",
      Billar: "off",
      Discounts: "off",

      pills: "1",
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.toggle = this.toggle.bind(this);
  }

  
    

  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
      Paulaner: "off",
      Triana: "off",
      Alameda: "off",
      Cruzcampo: "off",
      Dardos: "off",
      Billar: "off",
      Discounts: "off",
    });
  }
  handleTermChange(e) {
    var checked_map = e.target.checked ? "on" : "off";
    this.setState({ [e.target.name]: checked_map },
     
    );
    
  }

  async handleSearch(e) {

    let beers = [];
    let zones = [];
    let leisures = [];
    let discounts = [];

    if (this.state['Paulaner'] == "on") {
      beers.push("Paulaner");
    }
    if (this.state['Cruzcampo'] == "on") {
      beers.push("Cruzcampo");
    }
    if (this.state['Alameda'] == "on") {
      zones.push("Alameda");
    }
    if (this.state['Triana'] == "on") {
      zones.push("Triana");
    }
    if (this.state['Dardos'] == "on") {
      leisures.push("Dardos");
    }
    if (this.state['Billar'] == "on") {
      leisures.push("Billar");
    }

    if (this.state['Discounts'] == "on") {
      discounts.push("Discounts");
    }

    let params = "";
    beers.map((e, i) => {
      if (i === 0) {
        params += "beers=" + e;
      } else {
        params += "," + e;
      }
    })
    zones.map((e, i) => {
      if (i === 0) {
        params += "&zones=" + e;
      } else {
        params += "," + e;
      }
    })
    leisures.map((e, i) => {
      if (i === 0) {
        params += "&leisures=" + e;
      } else {
        params += "," + e;
      }
    })
    discounts.map((e, i) => {
      if (i === 0) {
        params += "&discounts=" + e;
      } else {
        params += "," + e;
      }
    })
    


  }

  handleEnter(e) {
    if (e.key === 13) {
      this.handleSearch();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleSearch();

  }

  render() {
    return (

      <>
        <Button
          color="primary"
          className="mr-1"
          onClick={this.toggle}
        >
          Filtros
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={this.toggle}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Filtros</h4>
          </div>
          <ModalBody>
            <Container>
              <Row>
                <Col className="ml-auto mr-auto" >

                  <div className="nav-align-center">

                    <Nav
                      className="nav-pills-info nav-pills-just-icons"
                      pills
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          className={this.state['pills'] === "1" ? "active" : ""}
                          href=""
                          onClick={(e) => {
                            e.preventDefault();

                            this.setState({
                              pills: "1",
                            })
                          }}
                        >
                          <i className="now-ui-icons location_world"></i>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={this.state['pills'] === "2" ? "active" : ""}
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              pills: "2",
                            })
                          }}
                        >
                          <i className="now-ui-icons  design_image"></i>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={this.state['pills'] === "3" ? "active" : ""}
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              pills: "3",
                            })
                          }}
                        >
                          <i className="now-ui-icons sport_user-run"></i>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={this.state['pills'] === "4" ? "active" : ""}
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              pills: "4",
                            })
                          }}
                        >
                          <i className="now-ui-icons sport_user-run"></i>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>

                  <Form className="searchbox" onSubmit={this.handleSubmit}>
                    <TabContent className="gallery" activeTab={"pills" + this.state['pills']}>

                      <TabPane tabId="pills1">
                        <h3 className="text-center mt-2"> Zonas</h3>

                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox"
                              placeholder="Alameda"
                              onChange={this.handleTermChange}
                              onKeyDown={this.handleEnter}
                              name="Alameda"
                            />
                            <span className="form-check-sign"></span>
                      Alameda
                      </Label>
                        </FormGroup>

                        <FormGroup check>

                          <Label check>
                            <Input type="checkbox"
                              placeholder="Triana"
                              onChange={this.handleTermChange}
                              onKeyDown={this.handleEnter}
                              name="Triana"
                            />
                            <span className="form-check-sign"></span>
                          Triana
                          </Label>
                        </FormGroup>
                      </TabPane>
                      <TabPane tabId="pills2">
                        <h3 className="text-center mt-2"> Cervezas</h3>

                        <FormGroup check>

                          <Label check>
                            <Input type="checkbox"
                              placeholder="Paulaner"
                              onChange={this.handleTermChange}
                              onKeyDown={this.handleEnter}
                              name="Paulaner"
                            />
                            <span className="form-check-sign"></span>
                        Paulaner
                        </Label>
                        </FormGroup>
                        <FormGroup check>

                          <Label check>
                            <Input type="checkbox"
                              placeholder="Cruzcampo"
                              onChange={this.handleTermChange}
                              onKeyDown={this.handleEnter}
                              name="Cruzcampo"
                            />
                            <span className="form-check-sign"></span>
                      Cruzcampo
                      </Label>
                        </FormGroup>
                      </TabPane>
                      <TabPane tabId="pills3">
                        <h3 className="text-center mt-2"> Ocio</h3>


                        <FormGroup check>

                          <Label check>
                            <Input type="checkbox"
                              placeholder="Dardos"
                              onChange={this.handleTermChange}
                              onKeyDown={this.handleEnter}
                              name="Dardos"
                            />
                            <span className="form-check-sign"></span>
                          Dardos
                        </Label>
                        </FormGroup>
                        <FormGroup check>

                          <Label check>
                            <Input type="checkbox"
                              placeholder="Billar"
                              onChange={this.handleTermChange}
                              onKeyDown={this.handleEnter}
                              name="Billar"
                            />
                            <span className="form-check-sign"></span>
                          Billar
                        </Label>
                        </FormGroup>
                      </TabPane>

                      <TabPane tabId="pills4">
                        <h3 className="text-center mt-2"> Descuentos</h3>
                        <FormGroup check>

                        <Label check>
                          <Input type="checkbox"
                            placeholder="Discounts"
                            onChange={this.handleTermChange}
                            onKeyDown={this.handleEnter}
                            name="Discounts"
                          />
                          <span className="form-check-sign"></span>
                        Cualquier descuento
                        </Label>
                        </FormGroup>
                      </TabPane>

                    </TabContent>
                   
                  </Form>
                </Col>

              </Row>

            </Container>

          </ModalBody>
          <div className="modal-footer">

            <Link
              onClick={
                this.handleSearch,
                this.toggle
              }
              to={{
                pathname: '/list',
                key: uuid.v4(),
                state: [{
                  Paulaner: this.state['Paulaner'],
                  Triana: this.state['Triana'],
                  Alameda: this.state['Alameda'],
                  Cruzcampo: this.state['Cruzcampo'],
                  Billar: this.state['Billar'],
                  Dardos: this.state['Dardos'],
                  Discounts: this.state['Discounts'],

                }]
              }}> <Button
                color="primary"
                type="button"

              >
                Buscar
                            </Button> </Link>
          </div>
        </Modal>
      </>

    );
  }
}
export default ModalSearch;

