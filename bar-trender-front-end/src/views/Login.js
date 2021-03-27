import POSTLoginFormQRValidator from "components/ApiLoginFormQRValidator";
import FormQRValidatorAlreadyLogged from "components/FormQRValidatorAlreadyLogged";
import React from "react";
import { Container } from "reactstrap";


function loginOwner(){

    var token = sessionStorage.getItem("token");
    document.body.style.fontFamily = "Dosis";

    
    if(!token){
        return (

            <>
                <Container>
                    <div>
                        <h1 className="text-center">Inicia Sesión</h1>
                    </div>
                    <POSTLoginFormQRValidator/>
                </Container>
            </>

        );
    }else{
        return (
            <FormQRValidatorAlreadyLogged/>
        )
    }
}

export default loginOwner;