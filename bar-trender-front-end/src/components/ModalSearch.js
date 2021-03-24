
import React, { Component } from "react";

import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom"
import * as uuid from 'uuid';
// reactstrap components
import {
  Modal,
  ModalBody,

} from "reactstrap";

// core components
import POSTForm from "./ApiFormSubmit";

class ModalSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState,
      fade: true,

      Paulaner: "off",
      Triana: "off",
      Alameda: "off",
      Cruzcampo: "off",
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
      fade: !this.state.fade

    });
  }
  handleTermChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSearch(e) {
    // this.props.searchEngine(this.state.term);


    // console.log(this.state.filters);
    // let temp_state = JSON.stringify(this.state.filters)

    // console.log(this.state)

    let beers = [];
    let zones = [];

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

    // this.context.router.push("/list");
    // window.location.href = 'list';


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



  // const [modal1, setModal1] = React.useState(false);
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
              toggle={this.toggle}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Filtros</h4>
          </div>
          <ModalBody>
            <Form className="searchbox" onSubmit={this.handleSubmit}>

              <FormGroup>
                <Input
                  defaultValue=""
                  placeholder="Regular"
                  type="text"
                  name="nombre"
                  onChange={this.handleTermChange}
                ></Input>
              </FormGroup>

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
                    placeholder="Triana"
                    onChange={this.handleTermChange}
                    onKeyDown={this.handleEnter}
                    name="Triana"
                  />
                  <span className="form-check-sign"></span>
    Triana
</Label>
              </FormGroup>
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
                    placeholder="Cruzcampo"
                    onChange={this.handleTermChange}
                    onKeyDown={this.handleEnter}
                    name="Cruzcampo"
                  />
                  <span className="form-check-sign"></span>
    Cruzcampo
</Label>
              </FormGroup>
              <FormGroup>
                <Col sm="2">
                  <div className="">
                    {/* <Button
                onClick={this.handleSearch}
                className="btn"
            >
                Submit
         </Button> */}
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
                        }]
                      }}> List </Link>
                  </div>
                </Col>
              </FormGroup>
            </Form>

          </ModalBody>
          <div className="modal-footer">

            <Button
              color="danger"
              type="button"
              onClick={this.toggle}
            >
              Close
                    </Button>
          </div>
        </Modal>
      </>

    );
  }
}
export default ModalSearch;

