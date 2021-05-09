import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ModalHeader,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";

// reactstrap components
import { Button, Modal, ModalBody, UncontrolledTooltip } from "reactstrap";

// core components
import image_left from "../../assets/img/bar-interior.jpg";
import Qr from "../../App.js";

//css components
import "../../views/css/ModalQR.css";
import ListDiscount from "../ListDiscount";
import "./ModalSelectedElement.css";
import { withScriptjs } from "react-google-maps";
import Map from "components/Map.js";

function ModalSelectedElement(prop) {
  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const { element } = prop;
  const description = element.desc_text !== undefined;

  const [appState, setAppState] = useState({
    discounts: {},
  });

  const location =
    element.street_text +
    ", " +
    element.number_text +
    ", " +
    element.zone_enum +
    ", " +
    element.locality_text;

  var divStyle = {};
  if (element.photo_url === undefined) {
    divStyle = {
      backgroundImage: "url(" + image_left + ")",
      backgroundSize: "cover",
      height: "15rem",
    };
  } else {
    divStyle = {
      backgroundImage: "url(" + element.photo_url + ")",
      backgroundSize: "cover",
      height: "15rem",
    };
  }

  async function loadDiscounts() {
    const apiUrl =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
      element.id +
      "/discounts/get?page=1&all=False";
    await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: "",
        apiKey: "8dDc431125634ef43cD13c388e6eCf11",
      },
    })
      .then((response) => response.json())
      .then((discounts) => {
        setAppState({ discounts: discounts });
      });
  }

  const MapLoader = withScriptjs(Map);

  return (
    <>
      <Card
        className="bg-primary"
        style={{ height: "25rem" }}
        onClick={() => {
          setModal1(true);
          loadDiscounts();
        }}
        role="button"
      >
        <CardHeader style={divStyle}></CardHeader>
        <CardBody style={{ height: "0%" }}>
          <h3 className="text-center text-white">{element.name_text}</h3>
          <h5 className="text-center text-white">
            <i className="fal fa-map-marker-alt mr-2"></i>
            {element.street_text} / {element.locality_text}
          </h5>
        </CardBody>
      </Card>

      <Modal
        animation={false}
        size="lg"
        modalClassName="modal-info"
        isOpen={modal1}
        toggle={() => setModal1(false)}
      >
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons text-danger ui-1_simple-remove"></i>
          </button>
          <h1 className="title text-center title-up my-auto">{element.name}</h1>

          <ModalHeader>
            <h2 className="text-center">{element.name_text}</h2>
          </ModalHeader>
        </div>
        <ModalBody className="text-white">
          <Row className="justify-content-center">
            <img
              className="image-container img-fluid mb-0 w-75"
              src={
                element.photo_url !== undefined ? element.photo_url : image_left
              }
              onClick={() => setModal1(true)}
              alt=""
            />
          </Row>
          <Container>
            <Row className="my-3">
              <Col className="my-3" lg="6" md="6" xs="12">
                <Container className="mx-auto">
                  <p>
                    <i className="fal fa-phone-alt text-primary"></i>{" "}
                    {element.phone_number}
                  </p>
                  <p>
                    <i className="fal fa-university text-primary"></i>{" "}
                    {element.locality_text}
                  </p>
                  <p>
                    <i className="fal fa-map-signs text-primary"></i>{" "}
                    {element.street_text}
                  </p>
                </Container>
              </Col>

              <Col
                className="my-3"
                lg="6"
                md="6"
                xs="12"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="text-center">
                  <span class="text-primary">
                    <i className="my-auto fal fa-tags mr-2 text-primary"></i>
                    Etiquetas
                  </span>
                </div>
                <Row className="text-primary justify-content-center">
                  <div class="col-2">
                    <Button
                      className="bg-transparent"
                      onClick={() => {
                        document.getElementsByClassName("tag-active")[0].classList.add("d-none");
                        document.getElementsByClassName("tag-active")[0].classList.remove("tag-active");
                        document.getElementById("content-tag-ocio").classList.remove("d-none");
                        document.getElementById("content-tag-ocio").classList.add("tag-active");
                      }}
                    >
                      <i
                        color="primary"
                        id="create-tooltip"
                        className="fal fa-bowling-ball w-100 text-primary"
                      ></i>
                    </Button>
                  </div>
                  <div class="col-2">
                    <Button
                      className="bg-transparent"
                      onClick={() => {
                        document.getElementsByClassName("tag-active")[0].classList.add("d-none");
                        document.getElementsByClassName("tag-active")[0].classList.remove("tag-active");
                        document.getElementById("content-tag-bebida").classList.remove("d-none");
                        document.getElementById("content-tag-bebida").classList.add("tag-active");
                      }}
                    >
                      <i color="primary" class="fal fa-beer w-100 text-primary"></i>
                    </Button>
                  </div>
                  <div class="col-2">
                    <Button
                      className="bg-transparent"
                      onClick={() => {
                        document.getElementsByClassName("tag-active")[0].classList.add("d-none");
                        document.getElementsByClassName("tag-active")[0].classList.remove("tag-active");
                        document.getElementById("content-tag-estilo").classList.remove("d-none");
                        document.getElementById("content-tag-estilo").classList.add("tag-active");
                      }}
                    >
                      <i color="primary" class="fal fa-chess-rook w-100 text-primary"></i>
                    </Button>
                  </div>
                  <div class="col-2">
                    <Button
                      className="bg-transparent"
                      onClick={() => {
                        document.getElementsByClassName("tag-active")[0].classList.add("d-none");
                        document.getElementsByClassName("tag-active")[0].classList.remove("tag-active");
                        document.getElementById("content-tag-ambiente").classList.remove("d-none");
                        document.getElementById("content-tag-ambiente").classList.add("tag-active");
                      }}
                    >
                      <i color="primary" class="fal fa-gramophone w-100 text-primary"></i>
                    </Button>
                  </div>
                  <div class="col-2">
                    <Button
                      className="bg-transparent"
                      onClick={() => {
                        document.getElementsByClassName("tag-active")[0].classList.add("d-none");
                        document.getElementsByClassName("tag-active")[0].classList.remove("tag-active");
                        document.getElementById("content-tag-zona").classList.remove("d-none");
                        document.getElementById("content-tag-zona").classList.add("tag-active");
                      }}
                    >
                      <i color="primary" class="now-ui-icons location_world w-100 text-primary"></i>
                    </Button>
                  </div>
                </Row>
                <Row className="tag-active" id="content-tag-ocio">
                <ul
                    style={{
                      display: "flex",
                      listStyleType: "none",
                      padding: "0px",
                    }}
                  >
                    <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-primary">Ocio</p>
                          </div>
                        </li>
                    {element.tags.map((tag) => {
                      if(tag.type=="Ocio"){
                      return (
                        
                        <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-white">{tag.name}</p>
                          </div>
                        </li>
                      );
                    }
                    })}
                  </ul>
                </Row>
                <Row className="d-none" id="content-tag-bebida">
                <ul
                    style={{
                      display: "flex",
                      listStyleType: "none",
                      padding: "0px",
                    }}
                  >
                    <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-primary">Bebida</p>
                          </div>
                        </li>
                    {element.tags.map((tag) => {
                      if(tag.type=="Bebida"){
                      return (
                        
                        <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-white">{tag.name}</p>
                          </div>
                        </li>
                      );
                    }
                    })}
                  </ul>
                </Row>
                <Row className="d-none" id="content-tag-estilo">
                <ul
                    style={{
                      display: "flex",
                      listStyleType: "none",
                      padding: "0px",
                    }}
                  >
                    <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-primary">Estilo</p>
                          </div>
                        </li>
                    {element.tags.map((tag) => {
                      if(tag.type=="Estilo"){
                      return (
                        
                        <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-white">{tag.name}</p>
                          </div>
                        </li>
                      );
                    }
                    })}
                  </ul>
                </Row>
                <Row className="d-none" id="content-tag-zona">
                <ul
                    style={{
                      display: "flex",
                      listStyleType: "none",
                      padding: "0px",
                    }}
                  >
                    <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-primary">Zona</p>
                          </div>
                        </li>
                    {element.tags.map((tag) => {
                      if(tag.type=="Zona"){
                      return (
                        
                        <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-white">{tag.name}</p>
                          </div>
                        </li>
                      );
                    }
                    })}
                  </ul>
                </Row>
                <Row className="d-none" id="content-tag-ambiente">
                <ul
                    style={{
                      display: "flex",
                      listStyleType: "none",
                      padding: "0px",
                    }}
                  >
                    <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-primary">Ambiente</p>
                          </div>
                        </li>
                    {element.tags.map((tag) => {
                      if(tag.type=="Ambiente"){
                      return (
                        
                        <li
                          className="mx-1"
                          style={{ flexGrow: "1", width: "100%" }}
                        >
                          <div className="text-center">
                            <p className="text-white">{tag.name}</p>
                          </div>
                        </li>
                      );
                    }
                    })}
                  </ul>
                </Row>
              </Col>
            </Row>
            <Container>
              <Row className="justify-content-center">
                <i className="fal fa-quote-right my-auto mr-2 text-primary"></i>
                <p className="my-auto text-primary">
                  Descripción del establecimiento
                </p>
              </Row>
              <Row className="justify-content-center my-2">
                {description && <p>{element.desc_text}</p>}
                {!description && <p>Un establecimiento de BarTrender</p>}
              </Row>
            </Container>
          </Container>
          <Row className="justify-content-center"></Row>
          <ListDiscount discounts={appState.discounts} />

          <h3>Ubicacion</h3>
          <MapLoader
            location={location}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3iyCKwQGF0wXBZKOuKhdMIZivUEtMe4s"
            loadingElement={<div style={{ height: `100%` }} />}
          />
        </ModalBody>
        <div className="modal-footer">
          <Button color="danger" type="button" onClick={() => setModal1(false)}>
            Cerrar
          </Button>
        </div>
      </Modal>

      <Modal
        className="modal-qr"
        centered="true"
        isOpen={modal2}
        toggle={() => setModal2(false)}
      >
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal2(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h4 className="title title-up">Aquí tienes tu descuento </h4>
        </div>
        <div className="bar-name">
          <h3 className="bar-name-content">{element.name_text}</h3>
        </div>
        <ModalBody>
          <p>{element.establishment_id}</p>
          <Qr />
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalSelectedElement;
