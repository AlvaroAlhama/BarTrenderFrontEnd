import React from "react";
import { Link } from "react-router-dom";
import barTrender from '../../assets/img/barTrender60.png';
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
  NavbarText,
  FormGroup,
  Input,
} from "reactstrap";
import Javascript from "../../views/index-sections/Javascript.js";
import ModalSearch from "../../components/ModalSearch";


function MainNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("bg-primary");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
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
      <Navbar className={"fixed-top " + navbarColor}  color="primary" expand="lg">
        <Container>
          {/* <UncontrolledDropdown className="button-dropdown">
            <DropdownToggle
              caret
              data-toggle="dropdown"
              href="#pablo"
              id="navbarDropdown"
              tag="a"
              onClick={(e) => e.preventDefault()}
            >
              <span className="button-bar"></span>
              <span className="button-bar"></span>
              <span className="button-bar"></span>
            </DropdownToggle>
            <DropdownMenu aria-labelledby="navbarDropdown">
              <DropdownItem header>
                Menú
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem href="#sobre-nosotros">
                ¿Quiénes somos?
              </DropdownItem>
              <DropdownItem href="#nuestro-equipo">
                Nuestro Equipo
              </DropdownItem>
              <DropdownItem href="#contact-us">
                Contáctanos
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
          <div className="navbar-translate"style= {{margin:"0"}}>
              <Nav>
                <NavLink className="Logo" href="/main" style= {{float:"left"}}>
                  <img src={barTrender} />
                  
                </NavLink>
                <NavbarBrand
                  href="/main"
                  target="_blank"
                  id="navbar-brand"
                >
                  BarTrender
                </NavbarBrand>
              
                <button
                  className="navbar-toggler navbar-toggler"
                  onClick={() => {
                    document.documentElement.classList.toggle("nav-open");
                    setCollapseOpen(!collapseOpen);
                  }}
                  aria-expanded={collapseOpen}
                  type="button"
                >
                  <span className="navbar-toggler-bar top-bar"></span>
                  <span className="navbar-toggler-bar middle-bar"></span>
                  <span className="navbar-toggler-bar bottom-bar"></span>
                </button>
              </Nav>
          </div>
          
          <ModalSearch />

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
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Síguenos en Twitter
                </UncontrolledTooltip>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  href="https://www.facebook.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem> */}
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/bartrenderofficial/"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Síguenos en Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;
