import React from "react";
import barTrender from "../../assets/img/barTrender60.png";
import * as uuid from "uuid";

// reactstrap components
import {
  Collapse,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  UncontrolledTooltip,
} from "reactstrap";
import ModalSearch from "../../components/Modals/ModalSearch";
import ModalLogin from "../../components/Modals/ModalLogin";
import ModalSignUp from "../../components/Modals/ModalSignUp";
import ModalEditClient from "../../components/Modals/ModalEditClient.js";

import "./MainNavbar.css";

function MainNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 200 ||
        document.body.scrollTop > 200
      ) {
        setNavbarColor("bg-primary");
        document.getElementById("filters").classList.remove("btn-primary");
        document.getElementById("filters").classList.add("bg-dark"); 
        
      } else if (
        document.documentElement.scrollTop < 201 ||
        document.body.scrollTop < 201
      ) {
        
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  function reportWindowSize() {
    const { innerWidth: width } = window;
    if (width < 750 && document.getElementById("bartrender-title") != null) {
      if (document.getElementById("bartrender-title") != null) {
        document.getElementById("bartrender-title").classList.add("d-none");
      }
      if (document.getElementById("filters") != null) {
        document.getElementById("filters").classList.add("mx-auto");
      }
      if (document.getElementById("panel-control-icon") != null) {
        document.getElementById("panel-control-icon").classList.add("my-auto");
      }
      if (document.getElementById("logout-tooltip") != null) {
        document.getElementById("logout-tooltip").classList.add("my-auto");
      }
    }
    if (width > 750 && document.getElementById("bartrender-title") != null) {
      if (document.getElementById("bartrender-title") != null) {
        document.getElementById("bartrender-title").classList.remove("d-none");
      }
      if (document.getElementById("filters") != null) {
        document.getElementById("filters").classList.remove("mx-auto");
      }
      if (document.getElementById("panel-control-icon") != null) {
        document
          .getElementById("panel-control-icon")
          .classList.remove("my-auto");
      }
      if (document.getElementById("logout-tooltip") != null) {
        document.getElementById("logout-tooltip").classList.remove("my-auto");
      }
    }
  }
  
  reportWindowSize()
  window.addEventListener("resize", reportWindowSize);
  const logged = sessionStorage.getItem("token");
  const isLoggedOwner = logged && sessionStorage.getItem("rol") === "owner";
  const isLoggedClient = logged && sessionStorage.getItem("rol") === "client";
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}

      <Navbar
        className={"fixed-top " + navbarColor}
        color="primary"
        expand="lg"
      >
        <a class="navbar-brand" href="/main">
          <img className="img-fluid" alt="" src={barTrender} />
        </a>
        <a id="bartrender-title" class="text-decoration-none" href="/main">
          <h1 class="my-auto ml-4">BarTrender</h1>
        </a>
        <ModalSearch key={uuid.v4()} />
        <button
          className="navbar-toggler navbar-toggler mr-5"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(!collapseOpen);
          }}
          aria-expanded={collapseOpen}
          type="button"
        >
          <i class="fal fa-chevron-circle-down fa-lg text-white "></i>
        </button>

        <Collapse className="justify-content-end" isOpen={collapseOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                href="https://twitter.com/TrenderBar"
                target="_blank"
                id="twitter-tooltip"
                cursor="pointer"
              >
                <i class="fab fa-twitter fa-lg w-100 text-white my-auto"></i>
                <p className="d-lg-none text-white d-xl-none mt-2 ml-2">
                  Twitter
                </p>
              </NavLink>
              <UncontrolledTooltip target="#twitter-tooltip">
                Síguenos en Twitter
              </UncontrolledTooltip>
            </NavItem>

            <NavItem>
              <NavLink
                href="https://www.instagram.com/bartrenderofficial/"
                target="_blank"
                id="instagram-tooltip"
              >
                <i class="fab fa-instagram fa-lg w-100 my-auto text-white"></i>
                <p className="d-lg-none text-white d-xl-none mt-2 ml-2">
                  Instagram
                </p>
              </NavLink>
              <UncontrolledTooltip target="#instagram-tooltip">
                Síguenos en Instagram
              </UncontrolledTooltip>
            </NavItem>
            {isLoggedOwner && (
              <NavItem>
                <NavLink href="/admin/dashboard" id="discount-tooltip">
                  <i
                    id="panel-control-icon"
                    class="fal fa-joystick text-white mt-1 fa-lg"
                  ></i>
                  <p className="d-lg-none text-white d-xl-none ml-2 my-auto">
                    Panel de control
                  </p>
                </NavLink>
                <UncontrolledTooltip target="#discount-tooltip">
                  Panel de control
                </UncontrolledTooltip>
              </NavItem>
            )}
            <NavItem>
              <NavLink id="account-tooltip" role='button'>
                
                <ModalLogin />
                <UncontrolledTooltip target="#account-tooltip">
                  {logged ? 'Cerrar Sesión' : 'Iniciar Sesión'}
                </UncontrolledTooltip>
              </NavLink>
            </NavItem>
            {!logged && (
              <NavItem>
                <NavLink id="signup-tooltip" role='button'>
                  <ModalSignUp />
                  <UncontrolledTooltip target="#signup-tooltip">
                    Registro
                  </UncontrolledTooltip>
                </NavLink>
              </NavItem>
            )}
            {isLoggedClient && (
              <NavItem>
                <NavLink id="edit-profile-tooltip" role='button'>
                  <ModalEditClient />
                  <UncontrolledTooltip target="#edit-profile-tooltip">
                    Mi perfil
                  </UncontrolledTooltip>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
}

export default MainNavbar;
