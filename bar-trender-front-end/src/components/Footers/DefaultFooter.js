/*eslint-disable*/
import React from "react";
import barTrender from "../../assets/img/barTrender60.png";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="w-100 bg-primary py-3">
        <Container>
          <Row>
            <Col lg="4" className="my-auto justify-content-center text-center">
              <Row>
                <a className="text-white text-decoration-none my-2 mx-auto" href="/legal">
                  Acuerdo de términos
                </a>
              </Row>
              <Row>
                <a className="text-white my-2 text-decoration-none mx-auto" href="/condiciones-uso">
                  Condiciones de uso
                </a>
              </Row>
            </Col>
            <Col className="justify-content-center my-auto text-center" lg="4">
              <img src={barTrender} className="img-fluid"></img>
            </Col>
            <Col lg="4" className="my-auto">
              <Row className="justify-content-center">
                <div className="copyright text-white" id="copyright">
                  © {new Date().getFullYear()}, Diseñado por el equipo de BarTrender.
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
