import MainNavbar from "components/Navbars/MainNavbar";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import POSTCreateDiscount from "../components/ApiCreateDiscountForm";


function EstablishmentView(){

    const [appState, setAppState] = useState({
        loading: false,
        establishment: {},
        discounts: [],
    });
    
    const [modal1, setModal1] = React.useState(false);

    const idEstablishment = () => {
        var query = window.location.pathname;
        var splited = query.split("/");
        var idEstablishment = splited[2];

        return idEstablishment;
    }
    const id_establishment = idEstablishment();

    useEffect(() => {
        setAppState({loading:true});
            var token = sessionStorage.getItem("token");

             fetch("https://develop-backend-sprint-01.herokuapp.com/v1/establishments/"+id_establishment+"/get", {
                method:"GET",
                headers: {
                    "token": token
                }
            }).then(response => response.json())
            .then(data => {
                setAppState({loading:false, establishment: data.establishment, discounts: data.discounts})
        });
    }, [setAppState]);
    
    
    return (
        <>
            <MainNavbar />
            <h1>{appState.establishment == undefined ? "" : appState.establishment.name}</h1>
            <div class="establishment-props">
                <h2>Teléfono: </h2>
                <p>{appState.establishment == undefined ? "" : appState.establishment.phone}</p>
                <h2>Zona:</h2>
                <p>{appState.establishment == undefined ? "" : appState.establishment.zone}</p>
            </div>
            <div class="establsihment-discounts">
                <h1>Descuentos</h1>
                <button type="button" className="btn btn-primary" onClick = {() => setModal1(true)}>Añadir Descuento</button>
                <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() => setModal1(false)}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"></i>
                        </button>
                        <h4 className="title title-up">Nuevo descuento</h4>
                    </div>
                    <div class="container">
                        <hr />
                    </div>
                    <ModalBody>
                        <POSTCreateDiscount />
                    </ModalBody>
                </Modal>
                {appState.establishment == undefined ? "" : appState.discounts.map((discount) => {
                    return (
                        <p>{discount.name}</p>
                    )
                })}
            </div>
        </>
    )
}

export default EstablishmentView;
