import React from "react";

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "../../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";

import image_left from '../../assets/img/bg-landing.png';
import image_left_2 from '../../assets/img/bg-landing.png';
import image_right from '../../assets/img/bg-landing.png';

import employee_1 from '../../assets/img/bg-landing.png';
import employee_2 from '../../assets/img/victor.jpg';
import employee_3 from '../../assets/img/enrique.jpg';
import employee_4 from '../../assets/img/alvaro.jpg';
import employee_5 from '../../assets/img/jose.jpg';
import employee_6 from '../../assets/img/carlos-pardo.jpg';
import employee_7 from '../../assets/img/alejandro.jpg';
import employee_8 from '../../assets/img/xema.jpg';
import employee_9 from '../../assets/img/miguel.jpg';
import employee_10 from '../../assets/img/miguel-angel.jpg';
import employee_11 from '../../assets/img/fran.jpg';




function LandingPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <LandingPageHeader />
        <div id="sobre-nosotros" className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">Who we are? (PH) </h2>
                <h5 className="description">
                  {/* (TODO: RELLENAR DESCRIPCION) */}
                  Los chavales de BarTrender (PH)
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage: `url(${image_left})`,
                    }}
                  >
                    {/* // TODO: MAS INFO O REMODELAR */}
                    <p className="blockquote blockquote-info">
                      "Over the span of the satellite record, Arctic sea ice has
                      been declining significantly, while sea ice in the
                      Antarctichas increased very slightly" <br></br>
                      <br></br>
                      <small>-NOAA</small>
                    </p>
                  </div>
                  <div
                    className="image-container"
                    style={{
                      backgroundImage: `url(${image_left_2})`,
                    }}
                  ></div>
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage: `url(${image_right})`,

                    }}
                  ></div>
                  {/* // TODO: RELLENAR INFO O REMODELAR */}
                  <h3>
                    So what does the new record for the lowest level of winter
                    ice actually mean
                  </h3>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens with climate change. Even if the
                    Arctic continues to be one of the fastest-warming regions of
                    the world, it will always be plunged into bitterly cold
                    polar dark every winter. And year-by-year, for all kinds of
                    natural reasons, there’s huge variety of the state of the
                    ice.
                  </p>
                  <p>
                    For a start, it does not automatically follow that a record
                    amount of ice will melt this summer. More important for
                    determining the size of the annual thaw is the state of the
                    weather as the midnight sun approaches and temperatures
                    rise. But over the more than 30 years of satellite records,
                    scientists have observed a clear pattern of decline,
                    decade-by-decade.
                  </p>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens with climate change. Even if the
                    Arctic continues to be one of the fastest-warming regions of
                    the world, it will always be plunged into bitterly cold
                    polar dark every winter. And year-by-year, for all kinds of
                    natural reasons, there’s huge variety of the state of the
                    ice.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div id="nuestro-equipo" className="section section-team text-center">
          <Container>
            {/* // TODO: BUSCAR IMAGENES DEL EQUIPO Y RELLENAR */}
            <h2 className="title">Here is our team</h2>
            <div className="team">
              <Row>
                <Col >
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_1}
                    ></img>
                    <h4 className="title">Carlos Doblado Herrero</h4>
                    <p className="category text-info">Jefe de proyecto</p>
                    <p className="description">
                     Miembro del equipo con una gran capacidad de organizar proyectos. Además,
                     es capaz de asumir la responsabilidad completa y delegar el trabajo a la perfectamente.
                     Destaca por sus ganas e ilusión con la que ejerce su trabajo. 
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_2}
                    ></img>
                    <h4 className="title">Víctor Muñoz Ramírez</h4>
                    <p className="category text-info">Jefe del equipo Back-end</p>
                    <p className="description">
                      Miembro del equipo que tiene una gran capacidad para organizar equipos de trabajo. 
                      Ha liderado más de tres equipos de trabajo anteriormente, y todos ellos han obtenido un 
                      gran éxito. Además, tiene un buen conocimiento técnico relacionado al desarrollo back-end. 
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_3}
                    ></img>
                    <h4 className="title">Enrique Reina Gutiérrez</h4>
                    <p className="category text-info">Analista Back-end</p>
                    <p className="description">
                      Miembro del equipo con un gran potencial en la resolución de retos tecnológicos.
                      Además, tiene un amplio conocimiento técnico, tanto en las herramientas de desarrollo,
                      como en las herramientas de integración o despliegue (entre otras).
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_4}
                    ></img>
                    <h4 className="title">Álvaro Aguilar Alhama</h4>
                    <p className="category text-info">Desarrollador Back-end</p>
                    <p className="description">
                    Miembro del equipo con un buen conocimiento en las herramientas y 
                    lenguajes que ocupan este proyecto. Destaca por su constancia y entrega que le dedica al trabajo. 
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-youtube"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_5}
                    ></img>
                    <h4 className="title">Jose Manuel Cobo Guerrero</h4>
                    <p className="category text-info">Desarrollador Back-end</p>
                    <p className="description">
                      Miembro del equipo con un buen conocimiento de las 
                      herramientas que se utilizan en este proyecto. Destaca por la gran capacidad que posee para 
                      comprender los requisitos y convertirlos en realidad.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_6}
                    ></img>
                    <h4 className="title">Carlos Pardo Pastor</h4>
                    <p className="category text-info">Desarrollador back-end</p>
                    <p className="description">
                      Miembro del equipo con un amplio conocimiento técnico, tanto las tecnologías que se utilizan 
                      en este proyecto, como herramientas de integración, despliegue, etc. Por otro lado, 
                      destaca por la capacidad de resolver los retos propuestos con mucha calidad.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_10}
                    ></img>
                    <h4 className="title">Miguel Ángel Moreno Olmo</h4>
                    <p className="category text-info">Jefe del equipo Front-end</p>
                    <p className="description">
                      Miembro del equipo con una gran capacidad para organizar equipos de trabajo.
                      Es capaz de asumir la responsabilidad, organizar y repartir el trabajo de forma extraordinaria.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-youtube"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_8}
                    ></img>
                    <h4 className="title">José Manuel González Mancilla </h4>
                    <p className="category text-info">Analista Front-end</p>
                    <p className="description">
                      Miembro del equipo con una amplia capacidad para aprender y adaptarse a los retos propuestos.
                      Anteriormente, ha ocupado puestos de jefe de proyecto y revisor. Destaca por la capacidad 
                      de no dejar ningún cabo suelto.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_7}
                    ></img>
                    <h4 className="title">Alejandro Fuentes Gómez</h4>
                    <p className="category text-info">Desarrollador Front-end</p>
                    <p className="description">
                      Miembro del equipo con un amplio conocimiento en el desarrollo front-end. De hecho,
                      ha participado en otros proyectos profesionales como desarrollador Front-End. Destaca por su constancia
                      y entrega al trabajo.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-youtube"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_9}
                    ></img>
                    <h4 className="title">Miguel Ponce Melero</h4>
                    <p className="category text-info">Desarrollador Front-end</p>
                    <p className="description">
                     Miembro del equipo con una gran capacidad para aprender y adaptarse a nuevos retos.
                     Posee un amplio conocimiento en el ámbito del Front-End. Destaca por sus ganas de aportar al equipo.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-linkedin"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_11}
                    ></img>
                    <h4 className="title">Francisco Quintela Vela</h4>
                    <p className="category text-info">Desarrollador Front-end</p>
                    <p className="description">
                      Miembro del equipo con un gran conocimiento técnico sobre el ámbito Front-end.
                      Además, posee bastantes conocimientos sobre diseño y marketing digital. Destaca por 
                      la capacidad de entender perfectamente las necesidades del cliente.
                    </p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-youtube"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div id="contact-us" className="section section-contact-us text-center">
          <Container>
            <form action="mailto:bartrenderoficial@gmail.com" method="post" enctype="text/plain">

              <h2 className="title">Want to work with us?</h2>
              <p className="description">Your project is very important to us.</p>
              <Row>
                <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                  <InputGroup
                    className={
                      "input-lg" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Name..."
                      type="text"
                      name="Nombre"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                    ></Input>

                  </InputGroup>
                  <InputGroup
                    className={
                      "input-lg" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                  </InputGroup>
                  <div className="textarea-container">
                    <Input
                      cols="80"
                      name="Comentario"
                      placeholder="Type a message..."
                      rows="4"
                      type="textarea"
                    ></Input>
                  </div>
                  <div className="send-button">
                    <input className="btn-round info block" type="submit" value="Send"></input>
                    <input className="btn-round info block ml-4" type="reset" value="Reset"></input>
                  </div>
                </Col>
              </Row>
            </form>

          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default LandingPage;
