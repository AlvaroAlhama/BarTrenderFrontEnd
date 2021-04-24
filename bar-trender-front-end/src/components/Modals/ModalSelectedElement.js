import React, { useEffect, useState } from "react";
import { Container, Row, Col, ModalHeader, Card, CardBody, CardHeader } from "reactstrap";

// reactstrap components
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

// core components
import image_left from "../../assets/img/bar-interior.jpg";
import Qr from "../../App.js";

//css components
import "../../views/css/ModalQR.css";
import ListDiscount from "../ListDiscount";
import './ModalSelectedElement.css';
import { withScriptjs } from "react-google-maps";
import Map from "components/Map.js"

function ModalSelectedElement(prop) {
  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const { element } = prop;
  const description = element.desc_text != null;

  const [appState, setAppState] = useState({
    discounts: {},
  });
  
  const ubicacion = {
    lat: 36.92043226009566,
    lng: -6.080399144405965,
  };

  const location = element.street_text + ", " + element.number_text + ", " + element.zone_enum + ", " + element.locality_text;
  
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //     setUserLocation({
  //       user_location: {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       }
  //     });
  //   });

  // }, [setUserLocation]);

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

  // function loadInfo(){
  //   setModal1(true);
  //   const [] = useState({discounts:{}});

  //   fetch("http://localhost:8000/v1/establishments/1/discounts/get", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //      }
  //   }).then(response => response.json())
  //   .then(discounts => setAppState({discounts:discounts}))
  // };
  const MapLoader = withScriptjs(Map);

  return (
    <>
    <Card className="bg-primary">
      <CardHeader>
      <img
            className=""

            src={element.photo_url != null ? element.photo_url : image_left}
            onClick={() => {
              setModal1(true);
              loadDiscounts();
            }}

            alt=""
          />
      </CardHeader>
      <CardBody>
            <h3 class="text-center text-white">{element.name_text}</h3>
            <h5 class="text-center text-white"><i class="fal fa-map-marker-alt mr-2"></i>{element.street_text} / {element.locality_text}</h5>
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
              src={element.photo_url != null ? element.photo_url : image_left}
              onClick={() => setModal1(true)}
              alt=""
            />
          </Row>
          <Container>
            <Row className="my-3">
              <Col className="my-3" lg="6" md="6" xs="12">
                <Container className="mx-auto">
                  <p>
                    <i class="fal fa-phone-alt text-primary"></i>{" "}
                    {element.phone_number}
                  </p>
                  <p>
                    <i class="fal fa-university text-primary"></i>{" "}
                    {element.locality_text}
                  </p>
                  <p>
                    <i class="fal fa-map-signs text-primary"></i>{" "}
                    {element.street_text}
                  </p>
                </Container>
              </Col>
              <Col className="my-3" lg="6" md="6" xs="12">
                <Row className="justify-content-center mb-2">
                  <i class="my-auto fal fa-tags mr-2 text-primary"></i>
                  <p className=" my-auto text-primary">Etiquetas</p>
                </Row>
                <Row>
                  {element.tags.map((tag) => {
                    return (
                      <Col className="my-1" lg="4" md="4" xs="4">
                        <div className="text-center">
                          <p className="text-white">{tag.name}</p>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <Container>
              <Row className="justify-content-center">
                <i class="fal fa-quote-right my-auto mr-2 text-primary"></i>
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
          <Map location={location} />
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
