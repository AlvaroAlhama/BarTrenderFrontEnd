/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { NavLink, UncontrolledTooltip } from "reactstrap";
import ModalLogin from "../../components/Modals/ModalLogin";
import ModalCreateEstablishment from "../../components/Modals/ModalCreateEstablishment";
import MobileNavbarModal from "../../components/Navbars/MobileNavbarModal";

function Header() {

  function reportWindowSize() {

    const { innerWidth: width } = window;
    if(width < 800 && document.getElementById("logout-tooltip")!=null ){

      document.getElementById("logout-tooltip").classList.add("my-auto");

    }
    if (width > 800 && document.getElementById("logout-tooltip") != null) {
      document.getElementById("logout-tooltip").classList.remove("my-auto");

    }
  }
  window.addEventListener('resize', reportWindowSize);

  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <MobileNavbarModal/>

          <a href="/main"><h4 className="text-white my-auto">BarTrender</h4></a>


        </div>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">

          <NavLink id="createEstablishment-tooltip" className="ml-2">
            <ModalCreateEstablishment />
            <UncontrolledTooltip target="#createEstablishment-tooltip">
              Nuevo establecimiento
                </UncontrolledTooltip>
          </NavLink>

          <NavLink id="account-tooltip" className="mr-2" z>
            <ModalLogin />
            <UncontrolledTooltip target="#account-tooltip">
              Iniciar sesión / Cerrar Sesión
                </UncontrolledTooltip>
          </NavLink>


        </div>

        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className="mr-2">
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
          <span className="navbar-toggler-bar burger-lines"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="ml-auto" navbar>
          <NavItem>
              <NavLink id="createEstablishment-tooltip">
                <ModalCreateEstablishment />
                <UncontrolledTooltip target="#createEstablishment-tooltip">
                  Nuevo establecimiento
                </UncontrolledTooltip>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink id="account-tooltip">
                <ModalLogin />
                <UncontrolledTooltip target="#account-tooltip">
                  Iniciar sesión / Cerrar Sesión
                </UncontrolledTooltip>
              </NavLink>
            </NavItem>
            
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>

  );
}

export default Header;
