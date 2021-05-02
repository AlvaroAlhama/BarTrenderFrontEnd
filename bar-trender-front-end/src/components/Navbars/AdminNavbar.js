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
import {Modal, ModalBody} from "react-bootstrap";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavItem, NavLink, UncontrolledTooltip } from "reactstrap";
import ModalLogin from "../../components/Modals/ModalLogin";
import ModalCreateEstablishment from "../../components/Modals/ModalCreateEstablishment";
import MobileNavbarModal from "../../components/Navbars/MobileNavbarModal";
import routes from "routes.js";

function Header() {
 
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  };
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

  const isLoggedIn =
    sessionStorage.getItem("token") && sessionStorage.getItem("rol") == "owner";


  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <MobileNavbarModal/>
          <a href="/main"><h4 class="text-white my-auto">BarTrender</h4></a>

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
