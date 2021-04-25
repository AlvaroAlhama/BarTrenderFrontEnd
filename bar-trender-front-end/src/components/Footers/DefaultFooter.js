/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <div className="copyright" id="copyright" >
            © {new Date().getFullYear()}, Designed by BarTrender Team.
          </div>
        </Container>
        <Container>
          <div  className="footer-menu" id="legal-notice" style={{padding:"10px"}}>
           <a href="/legal">Aviso Legal</a>
          </div>
          <div  className="footer-menu" id="terms-of-use" style={{padding:"10px"}}>
           <a href="/condicione-uso">Condiciones de uso</a>
          </div>
          <div  className="footer-menu" id="privacy-policy" style={{padding:"10px"}}>
           <a href="/politica-privacidad">Política de privacidad</a>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
