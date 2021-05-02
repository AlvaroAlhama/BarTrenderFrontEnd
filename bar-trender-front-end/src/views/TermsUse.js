import React from 'react';
//css



// core components

import MainNavbar from 'components/Navbars/MainNavbar';
import DefaultFooter from "../components/Footers/DefaultFooter.js";
import { Container } from 'reactstrap';

function LegalNotice() {

  
  return (
    <>

      
        <MainNavbar/>
        
        <Container>
        <div className="wrapper">
        <section className="container mt-1" id = "legal-notice" style={{padding:"300px"}} > 
        <p>El sitio web www.bartrender.com y las aplicaciones para móviles y tablets son publicaciones de Bartrender S.L.</p>
        
        <p>Email: bartrenderoficial@gmail.com</p>
        
        <p>Última versión de la política de privacidad actualizada a 24 de abril de 2021.</p>
        </section>   
        
        </div>
        </Container>
         <DefaultFooter /> 
     

    </>
  );
}

export default LegalNotice;