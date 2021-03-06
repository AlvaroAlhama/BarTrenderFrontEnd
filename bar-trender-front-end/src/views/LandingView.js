import React from "react";
import DeviceIdentifier from 'react-device-identifier';

// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import MainNavbar from "../components/Navbars/MainNavbar.js";
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";

// images
import image_left from '../assets/img/expositions/hU-kQ3Epxeq2dhaBpUgYfYaPhHEOKXnHXSeUqLjTygYBV05OHhUSZEWilh_Da9zkI1d_cgz91KIPevD_BBhBWhaKevognkx6Bv7-QwkQdRG9oznKG6wOae4avH8ksi6bkJBLWl4.png';
import image_left_2 from "../assets/img/expositions/Yn0xRl4G5E1eabgf9nyC9j6DVQVHd5DBNcPehVZwakLHYP-toRbW22a8kFesYK_taX0ZY_WviWVcT3bQ40tlKhaKSuAQAu6graIF.png";
import image_right from "../assets/img/expositions/TR9IDnSgMV79XktfRCxesUmLacTZJI9fb3Cv3-aMamIGyWdL_OagKWYcJJAPqgm62bjW9I6yHlMsOhowVROsAUiNui0CGo-qmPU-.png";
import employee_0 from "../assets/img/carlos.png";
import employee_2 from '../assets/img/victor.png';
import employee_3 from '../assets/img/enrique.png';
import employee_4 from '../assets/img/alvaro.png';
import employee_5 from '../assets/img/jose.png';
import employee_6 from '../assets/img/carlos-pardo.png';
import employee_7 from '../assets/img/alejandro.png';
import employee_8 from '../assets/img/xema.png';
import employee_9 from '../assets/img/miguel.png';
import employee_10 from '../assets/img/miguel-angel.png';
import employee_11 from '../assets/img/fran.png';

import banner_establishment from '../assets/img/banner/banner-establecimiento.png';
import banner_client from  '../assets/img/banner/banner_cliente.png';
import banner_sponsor from  '../assets/img/banner/inversor_banner_rectangulo.png';
import banner2_establishment from  '../assets/img/banner/hostelero_banner_cuadrado.png';
import banner2_client from  '../assets/img/banner/banner_cliente_cuadrado.png';
import banner2_sponsor from  '../assets/img/banner/inversor-banner-cuadrado.png';
import "./css/LandingView.css";
function LandingView() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus] = React.useState(false);
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
    <DeviceIdentifier isDesktop={true} isTablet={true} isMobile={true}>
      <MainNavbar />
      <div className="wrapper">
        <LandingPageHeader />
        <div id="sobre-nosotros" className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">??Qui??nes somos?</h2>
                <h5 className="">
                  Somos un grupo de estudiantes de la Universidad de Sevilla y queremos presentarle este nuevo proyecto en el que estamos trabajando para el cual nos es muy importante su ayuda.
                  Nuestro objetivo es promocionar y descubrir nuevos lugares a nuestros usuarios, en el que puedan compartir grandes momentos sociales; y qu?? mejor lugar para compartirlos, que en nuestros bares, cervecer??as y pubs.
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage: `url(${image_left})`,
                    }}
                  >
                    <p className="blockquote blockquote-info">
                      T?? elige a tu gente que para elegir el bar te ayudamos nosotros <br></br>
                      <br></br>
                      <small>-BarTrender</small>
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
                  <h3 className="title">??Qu?? es BarTrender?</h3>
                  <h5 className="">
                  BarTrender es una p??gina web de b??squeda de bares, cervecer??as y pubs por zonas con una gran variedad de filtros que van desde bebidas espec??ficas, pasando por elementos de ocio como mesas de billar, hasta otros aspectos como si hay m??sica en el local. 
                  Para que todo el sistema de filtrado funcione necesitamos que los establecimientos se registren en la aplicaci??n y rellenen su perfil detalladamente, por lo que nos aseguraremos de hacer que este proceso sea lo m??s sencillo y c??modo posible.
                  </h5>
                  <h3 className="title">Funcionalidades</h3>
                  <h5 className="">
                  Por un lado, se distribuir??n descuentos y ofertas creadas por los propios locales que luego ser??n escaneadas como c??digo QR en dichos establecimientos. Para facilitar esto, no es necesaria la instalaci??n de ninguna aplicaci??n, solo har?? falta que el encargado de cobrar la oferta tenga un esc??ner QR en el m??vil.
                  Por otro lado, se ofrecer?? a todos los establecimientos registrados informaci??n que les pueda ser ??til para adecuar su negocio a los gustos de los consumidores. Esta informaci??n consistir?? en una serie de datos y/o gr??ficas que reflejen las b??squedas m??s frecuentes en su zona o la tendencia de estas en funci??n de los filtros que estar??n disponibles para las b??squedas de los usuarios.
                  </h5>
                  
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <Container>
        <div style={{display:"flex"}}className="video">
            <Row>
              <Col>
              <h2 style={{textAlign:"center"}} className ="title">Anuncio Cliente</h2>
              <div style={{display:"flex",flexDirection:"column"}}>
                <img alt="banner" id="banner" src={banner2_client}/>
                <br></br>
                <br></br>
                <iframe id ="video" src="https://www.youtube.com/embed/kfpeqI5MpvI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
              
              <br></br><br></br>
              <div className="img-banner">
                <img alt="banner" src={banner_client}/>
              </div>
              </Col>
              <br></br><br></br>
              <Col>
              <h2 style={{textAlign:"center"}} className ="title">Anuncio Establecimiento</h2>
              <div style={{display:"flex",flexDirection:"column"}}>
                <img id="banner" alt="banner" src={banner2_establishment}/>
                <br></br>
                <br></br>
                <iframe id ="video"  src="https://www.youtube.com/embed/JvYMrQV9boE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
              <br></br><br></br>
              <div className="img-banner">
                <img alt="banner" src={banner_establishment}/>
              </div>
              </Col>
              <br></br><br></br>
              <Col>
              <h2 style={{textAlign:"center"}} className ="title">Anuncio Inversores</h2>
              <div style={{display:"flex",flexDirection:"column"}}>
                <img id="banner" alt="banner" src={banner2_sponsor}/>
                <br></br>
                <br></br>
                <iframe id="video" src="https://www.youtube.com/embed/vpP9_indjqg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>              </div>
              <br></br><br></br>
              <div className="img-banner">
                <img alt="banner" src={banner_sponsor}/>
              </div>
              </Col>
            </Row>
            </div>
          </Container>
        <div id="nuestro-equipo" className="section section-team text-center">
          <Container>
            <h2 className="title">Este es nuestro equipo</h2>
            <div className="team">
              <Row className="mb-5">
                <Col >
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_0}
                    ></img>
                    <h4 className="title">Carlos Doblado Herrero</h4>
                    <p className="category text-info">Jefe de proyecto</p>
                    <p className="">
                      Miembro del equipo con una gran capacidad de organizar proyectos. Adem??s,
                      es capaz de asumir la responsabilidad completa y delegar el trabajo a la perfecci??n.
                      Destaca por sus ganas e ilusi??n con las que ejerce su trabajo.
                    </p>
                    
                  </div>
                </Col>
              </Row>
              <Row className="mb-5">
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_2}
                    ></img>
                    <h4 className="title">V??ctor Mu??oz Ram??rez</h4>
                    <p className="category text-info">Jefe del equipo Back-end</p>
                    <p className="">
                      Miembro del equipo que tiene una gran capacidad para organizar equipos de trabajo.
                      Ha liderado m??s de tres equipos de trabajo anteriormente, y todos ellos han obtenido un
                      gran ??xito. Adem??s, tiene un buen conocimiento t??cnico relacionado al desarrollo back-end.
                    </p>
                    
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_3}
                    ></img>
                    <h4 className="title">Enrique Reina Guti??rrez</h4>
                    <p className="category text-info">Analista Back-end</p>
                    <p className="">
                      Miembro del equipo con un gran potencial en la resoluci??n de retos tecnol??gicos.
                      Adem??s, tiene un amplio conocimiento t??cnico, tanto en las herramientas de desarrollo,
                      como en las herramientas de integraci??n o despliegue (entre otras).
                    </p>
                    
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_4}
                    ></img>
                    <h4 className="title">??lvaro Aguilar Alhama</h4>
                    <p className="category text-info">Desarrollador Back-end</p>
                    <p className="">
                      Miembro del equipo con un buen conocimiento en las herramientas y
                      lenguajes que ocupan este proyecto. Destaca por su constancia y entrega que le dedica al trabajo.
                    </p>
                   
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
                    <p className="">
                      Miembro del equipo con un buen conocimiento de las
                      herramientas que se utilizan en este proyecto. Destaca por la gran capacidad que posee para
                      comprender los requisitos y convertirlos en realidad.
                    </p>
                    
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
                    <h4 className="title">Miguel ??ngel Moreno Olmo</h4>
                    <p className="category text-info">Jefe del equipo Front-end</p>
                    <p className="">
                      Miembro del equipo con una gran capacidad para organizar equipos de trabajo.
                      Es capaz de asumir la responsabilidad, organizar y repartir el trabajo de forma extraordinaria.
                    </p>
                    
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_8}
                    ></img>
                    <h4 className="title">Jos?? Manuel Gonz??lez Mancilla </h4>
                    <p className="category text-info">Analista Front-end</p>
                    <p className="">
                      Miembro del equipo con una amplia capacidad para aprender y adaptarse a los retos propuestos.
                      Anteriormente, ha ocupado puestos de jefe de proyecto y revisor. Destaca por la capacidad
                      de no dejar ning??n cabo suelto.
                    </p>
                    
                  </div>
                </Col>
                <Col md="">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={employee_7}
                    ></img>
                    <h4 className="title">Alejandro Fuentes G??mez</h4>
                    <p className="category text-info">Desarrollador Front-end</p>
                    <p className="">
                      Miembro del equipo con un amplio conocimiento en el desarrollo front-end. De hecho,
                      ha participado en otros proyectos profesionales como desarrollador Front-End. Destaca por su constancia
                      y entrega al trabajo.
                    </p>
                    
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
                    <p className="">
                      Miembro del equipo con una gran capacidad para aprender y adaptarse a nuevos retos.
                      Posee un amplio conocimiento en el ??mbito del Front-End. Destaca por sus ganas de aportar al equipo.
                    </p>
                    
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
                    <p className="">
                      Miembro del equipo con un gran conocimiento t??cnico sobre el ??mbito Front-end.
                      Adem??s, posee bastantes conocimientos sobre dise??o y marketing digital. Destaca por
                      la capacidad de entender perfectamente las necesidades del cliente.
                    </p>
                    
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
                    <p className="category text-info">Desarrollador Front-end</p>
                    <p className="">
                      Miembro del equipo con un amplio conocimiento t??cnico, tanto las tecnolog??as que se utilizan
                      en este proyecto, como herramientas de integraci??n, despliegue, etc. Por otro lado,
                      destaca por la capacidad de resolver los retos propuestos con mucha calidad.
                    </p>
                   
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        
        <div id="contact-us" className="section section-contact-us text-center">
          <Container>
            <form action="mailto:bartrenderoficial@gmail.com" method="post" enctype="text/plain">

              <h2 className="title">??Quieres saber m??s sobre el proyecto?</h2>
              <p className="">Sientete libre de contactarnos sobre cualquier tema a nuestro correo electr??nico bartrenderoficial@gmail.com</p>
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
                      placeholder="Nombre..."
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
                      placeholder="Escribe tu mensaje..."
                      rows="4"
                      type="textarea"
                    ></Input>
                  </div>
                  <div className="send-button">
                    <input className="btn-round info block" type="submit" value="Enviar"></input>
                    <input className="btn-round info block ml-4" type="reset" value="Borrar"></input>
                  </div>
                </Col>
              </Row>
            </form>

          </Container>
        </div>
        <DefaultFooter />
      </div>
      </DeviceIdentifier>
    </>
  );
}

export default LandingView;
