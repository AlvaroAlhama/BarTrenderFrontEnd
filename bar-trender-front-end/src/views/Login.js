import POSTLoginFormQRValidator from "components/ApiLoginFormQRValidator";
import FormQRValidatorAlreadyLogged from "components/FormQRValidatorAlreadyLogged";
import React from "react";
import "./css/login.css"
import barTrender60 from "../assets/img/barTrender60.png"

function loginOwner(){

    var token = sessionStorage.getItem("token");
    document.body.style.fontFamily = "Dosis";

    
    if(!token){
        return (
            <>
                <div id="validation">
                    <div class="row justify-content-center pt-5">
                        <img src={barTrender60} alt="bg validation" class="img-fluid " />
                        <h1 class="my-auto text-white ml-3">BARTRENDER</h1>
                    </div>
                    <div class="container" id="container-validation">
                        <div class="d-flex justify-content-center h-100">
                            <div class="card" id="card-validation">
                                <div class="card-header" id="card-header-validation">
                                    <h1 className="text-center pt-3">Validar Descuento</h1>
                                </div>

                                <div class="card-body">
                                    <POSTLoginFormQRValidator />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        );
    }else{
        return (
            <>
                <div id="validation">
                    <div class="row justify-content-center pt-5">
                        <img src={barTrender60} alt="bg validation" class="img-fluid" />
                        <h1 class="my-auto text-white ml-3">BARTRENDER</h1>
                    </div>
                    <div class="container" id="container-validation">
                        <div class="d-flex justify-content-center h-100">
                            <div class="card" id="card-validation">
                                <div class="card-header" id="card-header-validation">
                                    <h1 className="text-center pt-3">Validar Descuento</h1>
                                </div>

                                <div class="card-body">
                                    <FormQRValidatorAlreadyLogged />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default loginOwner;