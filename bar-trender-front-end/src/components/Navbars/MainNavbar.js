import React from "react";

import barTrender from "../../assets/img/barTrender60.png";
import * as uuid from 'uuid';

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";
import ModalSearch from "../../components/Modals/ModalSearch";
import ModalLogin from "../../components/Modals/ModalLogin";
import ModalSignUp from "../../components/Modals/ModalSignUp";

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
        setNavbarColor("bg-primary solid-color");
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
  const logged = sessionStorage.getItem("token");
  const isLoggedOwner = logged && sessionStorage.getItem("rol") == "owner";
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
      <a class="text-decoration-none"href="/main"><h1 class="my-auto ml-4">BarTrender</h1></a>
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
          
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink
                  href="https://twitter.com/TrenderBar"
                  target="_blank"
                  id="twitter-tooltip"
                  cursor="pointer"
                >
                  <i class="fab fa-twitter fa-lg w-100 my-auto"></i>
                  <p className="d-lg-none d-xl-none mt-2 ml-2">Twitter</p>
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
                  <i class="fab fa-instagram fa-lg w-100 my-auto"></i>
                  <p className="d-lg-none d-xl-none mt-2 ml-2">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Síguenos en Instagram
                </UncontrolledTooltip>
              </NavItem>
              {isLoggedOwner && (
                <NavItem>
                  <NavLink href="/admin/dashboard" id="discount-tooltip">
                    <i class="fal fa-tachometer-alt-fastest fa-lg mt-1 w-100 my-auto"></i>
                    <p className="d-lg-none d-xl-none mt-2 ml-2">Panel de control</p>
                  </NavLink>
                  <UncontrolledTooltip target="#discount-tooltip">
                    Panel de control
                  </UncontrolledTooltip>
                </NavItem>
              )}
              <NavItem>
                <NavLink id="account-tooltip">
                  <ModalLogin />
                  <UncontrolledTooltip target="#account-tooltip">
                    Iniciar sesión / Cerrar Sesión
                  </UncontrolledTooltip>
                </NavLink>
              </NavItem>
              {!logged && (
                <NavItem>
                  <NavLink id="signup-tooltip">
                    <ModalSignUp/>
                  <UncontrolledTooltip target="#signup-tooltip">
                    Registro
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
