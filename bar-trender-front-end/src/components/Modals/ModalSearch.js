
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

import PaneContentFilters from "components/PaneContentFilters.js";

class ModalSearch extends React.Component {

  constructor(props) {
    // const [pills, setPills] = React.useState("2");
    super(props);

    this.state = {
      modal: props.initialModalState,
      fade: true,
      pills: "",
    };

   
    this.tags = [
      {
        name: "Cruzcampo",
        type: "Bebida"
      },
      {
        name: "Paulaner",
        type: "Bebida"
      },
      {
        name: "Billar",
        type: "Instalacion"
      },
      {
        name: "Dardos",
        type: "Instalacion"
      },
      {
        name: "Arabe",
        type: "Estilo"
      },
    ];

    function groupBy(xs, f) {
      return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }
    this.tags_grouped = groupBy(this.tags, (t) => t.type);


    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade,
      Paulaner: "off",
      Cruzcampo: "off",

    });
  }
  handleTermChange(e) {
    var checked_map = e.target.checked ? "on" : "off";

    this.setState({ [e.target.name]: checked_map },

    );
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

                      {Object.entries(this.tags_grouped).map(([key, index]) => {
                        return (
                          <>

                            <NavItem>
                              <NavLink
                                className={this.state['pills'] === key ? "active" : ""}
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({
                                    pills: key,
                                  })

                                }}
                              >
                                <i className="now-ui-icons  design_image"></i>
                              </NavLink>
                              {key}
                            </NavItem>
                          </>
                        );
                      })}
                    </Nav>



                  </div>
                </Col>
              </Row>
              <Row>
                <Col>

                  <Form className="searchbox" onSubmit={this.handleSubmit}>
                    {Object.entries(this.tags_grouped).map(([key, index]) => {
                      return (
                        <>
                          <TabContent className="gallery" activeTab={"pills" + this.state['pills']}>

                            <TabPane tabId={"pills" + key}>
                              <h3 className="text-center mt-2"> {key}</h3>


                              {this.tags_grouped[key].map((key) => {
                                return (
                                  <>
                                    <FormGroup check>
                                      <Label check>
                                        <Input type="checkbox"
                                          placeholder={key.name}
                                          onChange={this.handleTermChange}
                                          onKeyDown={this.handleEnter}
                                          name={key.name}
                                        />
                                        <span className="form-check-sign"></span>
                                        {key.name}
                                      </Label>
                                    </FormGroup>

                                  </>
                                );
                              })}
                            </TabPane>
                          </TabContent>
                        </>
                      );
                    })}
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
                state: [
                  this.state
                ]
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

