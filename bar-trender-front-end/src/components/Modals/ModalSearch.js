
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
} from "reactstrap";

// core components

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
      // {
      //   name: "Cruzcampo",
      //   type: "Bebidas"
      // },
      // {
      //   name: "Paulaner",
      //   type: "Bebidas"
      // },
      // {
      //   name: "Billar",
      //   type: "Instalacion"
      // },
      // {
      //   name: "Dardos",
      //   type: "Instalacion"
      // },
      // {
      //   name: "Arabe",
      //   type: "Estilo"
      // },
    ];
    console.log(this.tags, "construyendose")
    this.tags_grouped = [];
    function groupBy(xs, f) {
      return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }

    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_tags";

     
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': '8dDc431125634ef43cD13c388e6eCf11',
      }
    }).then(response => response.json())
      .then(tags => {
       this.tags = tags.tags;
       this.tags_grouped = groupBy(this.tags, (t) => t.type);
      // console.log(this.tags)
      // console.log(this.tags_grouped, "tags gruo")
    })

    this.handleTermChange = this.handleTermChange.bind(this);
    // this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDiscountChange = this.handleDiscountChange.bind(this);

    this.toggle = this.toggle.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);    
  }
  // EN cuanto se haga el fetch, se mete la respuesta en this.tags y se llama a la fun groupBy;
  toggle() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade
    });
  }
  handleTermChange(e) {
    var type = e.target.name.split(":")[0];
    var name = e.target.name.split(":")[1];
    if(e.target.name){
      console.log(e.target.value);
      this.setState({'name': e.target.value },);
    }else{
      if (e.target.checked == true) {
        // this.setState({ [type] : [name] },
        //   () => console.log(this.state, "checked"),
        // );
        if (this.state[type] == undefined) {
          this.setState({ [type]: [name] },
            () => console.log(this.state),
          );
        } else {
          this.state[type].push(name);
          console.log(this.state, "El doblao");
        }
      }
      else {
        var nameIndex = this.state[type].indexOf("name");
        this.state[type].splice(nameIndex, 1);
        console.log(this.state);
      }
    }
    



  }
  // handleNameChange(e) {

  //   var x = document.getElementById("name").value;
  //   this.setState({'name': x },
  //   );

  // }
  handleDiscountChange(e) {

    var x = document.getElementById("discounts").value;
    this.setState({'discounts': x=='on' ? true : false },
    );

  }

  renderSwitch(key) {
    switch(key) {
      case 'Zona':
        return 'now-ui-icons location_world';
      case 'Bebida':
        return 'fal fa-beer w-100';
      case 'Ocio':
        return 'fal fa-bowling-ball w-100';
      case 'Estilo':
        return 'fal fa-chess-rook w-100';
      case 'Instalacion':
        return 'fal fa-umbrella-beach w-100';
      case 'Ambiente':
        return 'fal fa-gramophone w-100'
      default:
        return 'now-ui-icons location_bookmark';
    }
  }

  render( ){
    return (

      <>
        <Button
          color="primary"
          className="mr-1"
          onClick={this.toggle}
          id="filters"
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
                      className="nav-pills-info nav-pills-just-icons justify-content-center w-100"
                      pills
                      role="tablist"
                    >

                      {Object.entries(this.tags_grouped).map(([key, index]) => {
                        return (
                          <>

                            <NavItem className="col-4">
                              <Container className="mt-3 mb-3">
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
                                <i class={this.renderSwitch(key)}></i>
                              </NavLink>
                              <h6 class="align-center ">{key}</h6>
                              </Container>
                            </NavItem>
                          </>
                        );
                      })}
                      <NavItem className="col-4">
                      <Container className="mt-3 mb-3">
                        <NavLink
                          className={this.state['pills'] === "Descuentos" ? "active" : ""}
                          href=""
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              pills: "Descuentos",
                            })
                          }}
                        >
                          <i className="now-ui-icons shopping_tag-content"></i>
                        </NavLink>
                        <h6 class="align-center ">Descuentos</h6>
                              </Container>
                      </NavItem>
                    </Nav>



                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>

                  <Form className="searchbox" onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label for="name">Nombre del establecimiento</Label>
                      <Input type="text" name="name" id="name" onChange={this.handleTermChange} />
                    </FormGroup>

                    {Object.entries(this.tags_grouped).map(([type, index]) => {
                      return (
                        <>
                          <TabContent className="gallery" activeTab={"pills" + this.state['pills']}>

                            <TabPane tabId={"pills" + type}>
                              <h3 className="text-center mt-2"> {type}</h3>


                              {this.tags_grouped[type].map((tag) => {
                                return (
                                  <>
                                    <FormGroup check>
                                      <Label id={"label-"+ tag.name} check>
                                        <Input type="checkbox"
                                          placeholder={tag.name}
                                          onChange={this.handleTermChange}
                                          name={type + ":" + tag.name}
                                        />
                                        <span className="form-check-sign"></span>
                                        {tag.name}
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
                    <TabPane tabId="pillsDescuentos">
                        <h3 className="text-center mt-2"> Descuentos</h3>
                        <FormGroup check>

                        <Label id="discount-label" check>
                          <Input type="checkbox"
                            placeholder="discounts"
                            onChange={this.handleDiscountChange}
                            onKeyDown={this.handleEnter}
                            name="discounts"
                            id = "discounts"
                          />
                          <span className="form-check-sign"></span>
                        Cualquier descuento
                        </Label>
                        </FormGroup>
                      </TabPane>
                  </Form>
                </Col>

              </Row>

            </Container>


          </ModalBody>
          <div className="modal-footer">

            <Link

              onClick={() => { 
                
                this.toggle()
                
                
                 }}

              to={{
                pathname: '/list',
                key: uuid.v4(),
                state: [
                  this.state
                ]
              }}> <Button
                color="primary"
                type="button"
                id="filter-search"

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

