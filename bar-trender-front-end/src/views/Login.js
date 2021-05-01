import POSTLoginFormQRValidator from "components/ApiLoginFormQRValidator";
import FormQRValidatorAlreadyLogged from "components/FormQRValidatorAlreadyLogged";
import React from "react";
import "./css/login.css";
import barTrender60 from "../assets/img/barTrender60.png";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import DefaultFooter from "components/Footers/DefaultFooter";

function loginOwner() {
  var token = sessionStorage.getItem("token");

  if (!token) {
    return (
      <>
        <div className="wrapper" id="wrapper-validation">
          <Row className="header bg-primary justify-content-center shadow pt-3 pb-3">
            <img src={barTrender60} alt="bg validation" class="img-fluid" />
            <h1 class="my-auto text-white ml-3">BarTrender</h1>
          </Row>

          <Row className="content align-items-center">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card className="shadow">
                <CardHeader className="text-center text-uppercase">
                  <CardTitle tag="h2">
                    <strong>Validar Descuento</strong>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <POSTLoginFormQRValidator />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="shadow footer-validation">
            <DefaultFooter />
          </Row>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="wrapper" id="wrapper-validation">
          <Row className="header bg-primary justify-content-center shadow pt-3 pb-3">
            <img src={barTrender60} alt="bg validation" class="img-fluid" />
            <h1 class="my-auto text-white ml-3">BarTrender</h1>
          </Row>

          <Row className="content align-items-center">
            <Col sm="12" md={{ size: 3, offset: 3 }}>
              <Card className="shadow">
                <CardHeader className="text-center text-uppercase">
                  <CardTitle tag="h2">
                    <strong>Validar Descuento</strong>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <FormQRValidatorAlreadyLogged />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="shadow footer-validation">
            <DefaultFooter />
          </Row>
        </div>
      </>
    );
  }
}

export default loginOwner;
