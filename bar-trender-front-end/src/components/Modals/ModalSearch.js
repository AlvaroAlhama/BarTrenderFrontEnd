
import React from "react";

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
  Container,
  Row,
} from "reactstrap";

function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {}); //eslint-disable-line
}

// core components
class ModalSearch extends React.Component {

  constructor(props) {
    // const [pills, setPills] = React.useState("2");
    super(props);
    
    this.state = {
      modal: props.initialModalState,
      fade: true,
      pills: "",
      WindowWidth: window.innerWidth,
      tags_grouped: []
    };


    this.tags = [
   
    ];
     
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (e.target.name === 'name') {
      this.setState({ 'name': e.target.value },);
    } else {
      if (e.target.checked === true) {
        if (this.state[type] === undefined) {
          this.setState({ [type]: [name] }
          );
        } else {
          this.state[type].push(name);
        }
      }
      else {
        var nameIndex = this.state[type].indexOf("name");
        this.state[type].splice(nameIndex, 1);
      }
    }

  }

  handleSubmit(event) {
    event.preventDefault();
   
  }
  
  handleDiscountChange(e) {

    var x = document.getElementById("discounts").value;
    this.setState({ 'discounts': x === 'on' ? true : false },
    );

  }

  renderSwitch(key) {
    switch (key) {
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
  async getZones() {
    const url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_zones?all=true";
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      var zonas = data.zones;
      var zona = new Array;
      zonas.forEach(element => { 
        zona.push({
          name: element,
          type:"Zona"
        })
      });
      // console.log(zona);
      return zona;
  
    }
  }

  componentDidMount()
  {
    

    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_tags";
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apiKey': '8dDc431125634ef43cD13c388e6eCf11',
      }
    })
    .then(response => response.json())
    .then(data => {
      var res = groupBy(data.tags, (t) => t.type)
      
      this.getZones().then(zonas => {
        res.Zona = zonas;
      })

      this.setState({
        tags_grouped: res
      }, 
      // () => console.log(this.state.tags_grouped),
    )
    })

    
  }

  componentDidUpdate() {
    //#206 - change
    // this.setState({WindowWidth: window.innerWidth})
    this.state.WindowWidth = window.innerWidth;
  }

  

  render() {
    return (

      <>
        <Button
          color="primary"
          className="ml-3"
          onClick={this.toggle}
          id="filters"
        >
          Filtros
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} style={{width:"100%", margin:"auto"}}>
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

                    <div style={{display:"flex", flexFlow:"row wrap", listStyle:"none"}}>
                        
                        {Object.entries(this.state.tags_grouped).length !== 0 ? Object.entries(this.state.tags_grouped).map(([key]) => {

                          if(window.innerWidth < 450) {
                            return (
                              <>
                                <NavItem className="col-4 p-0">
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
                                      <i style={{fontSize: "1.5rem"}} className={this.renderSwitch(key)}></i>
                                    </NavLink>
                                    <h6 className="align-center">{key}</h6>
                                  </Container>
                                </NavItem>
                              </>
                            );
                          }
                          else{
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
                                      <i style={{fontSize: "1.5rem"}} className={this.renderSwitch(key)}></i>
                                    </NavLink>
                                    <h6 className="align-center">{key}</h6>
                                  </Container>
                                </NavItem>
                              </>
                            );
                          }
                        }
                      ) : (<p>Cargando...</p>)}               

                        <NavItem className="col-4 p-0">
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

                              <i style={{fontSize: "1.5rem"}} className="now-ui-icons shopping_tag-content"></i>
                            </NavLink>
                            <h6 className="align-center ">Descuentos</h6>
                          </Container>
                        </NavItem>
                    </div>
                    
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

                    {Object.entries(this.state.tags_grouped).map(([type, index]) => {
                      return (
                        <>
                          <TabContent className="gallery" activeTab={"pills" + this.state['pills']}>

                            <TabPane tabId={"pills" + type}>
                              <h3 className="text-center mt-2"> {type}</h3>


                              {this.state.tags_grouped[type].map((tag) => {
                                return (
                                  <>
                                    <FormGroup check>
                                      <Label id={"label-" + tag.name} check>
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
                    <TabContent className="gallery" activeTab={"pills" + this.state['pills']}>

                      <TabPane tabId="pillsDescuentos">
                        <h3 className="text-center mt-2"> Descuentos</h3>
                        <FormGroup check>

                          <Label id="discount-label" check>
                            <Input type="checkbox"
                              placeholder="discounts"
                              onChange={this.handleDiscountChange}
                              onKeyDown={this.handleEnter}
                              name="discounts"
                              id="discounts"
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

