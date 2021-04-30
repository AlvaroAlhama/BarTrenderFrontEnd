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
import { useLocation, Route, Switch } from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin.js";
import {
  Link
} from "react-router-dom";
// react-bootstrap components
import {
  Container
} from "react-bootstrap";
import routes from "routes.js";

import sidebarImage from "assets/img/sidebar-3.jpg";
// styles for this kit


function AdminView() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  var token = sessionStorage.getItem("token");

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
  }, [location]);
  if(isBrowser){
    if (!token) {
      return (

        <>
          <div className="wrapper">
            <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
            <div className="main-panel" ref={mainPanel}>
              <AdminNavbar />
              <div className="content">
                <Container fluid>
                  <h1> Necesitas estar Logueado para poder acceder a la vista</h1>
                </Container>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
          <FixedPlugin
            hasImage={hasImage}
            setHasImage={() => setHasImage(!hasImage)}
            color={color}
            setColor={(color) => setColor(color)}
            image={image}
            setImage={(image) => setImage(image)}
          />
        </>
      );
    } else {
      if (sessionStorage.getItem("rol") === "owner") {

        return (
          <>
            <div className="wrapper">
              <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
              <div className="main-panel" ref={mainPanel}>
                <AdminNavbar />
                <div className="content">
                  <Switch>{getRoutes(routes)}</Switch>
                </div>
                
              </div>
            </div>
            <FixedPlugin
              hasImage={hasImage}
              setHasImage={() => setHasImage(!hasImage)}
              color={color}
              setColor={(color) => setColor(color)}
              image={image}
              setImage={(image) => setImage(image)}
            />
          </>
        );
      }
      else {
        return (
          <>
            <div className="wrapper">
              <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
              <div className="main-panel" ref={mainPanel}>
                <AdminNavbar />
                <div className="content">
                  <Container fluid>
                    <h1> Necesitas estar logueado como owner para poder acceder a la vista</h1>
                    <Link to="/main" className="btn btn-primary">Volver</Link>
                  </Container>
                </div>
                
              </div>
            </div>
            <FixedPlugin
              hasImage={hasImage}
              setHasImage={() => setHasImage(!hasImage)}
              color={color}
              setColor={(color) => setColor(color)}
              image={image}
              setImage={(image) => setImage(image)}
            />
          </>

        );
      }
    }
  }
  else{
    if (!token) {
      return (

        <>
          <div className="wrapper">
            
            <div className="main-panel" ref={mainPanel}>
              <AdminNavbar />
              <div className="content">
                <Container fluid>
                  <h1> Necesitas estar Logueado para poder acceder a la vista</h1>
                </Container>
              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </>
      );
    } else {
      if (sessionStorage.getItem("rol") === "owner") {

        return (
          <>
            <div className="wrapper">
              <div className="main-panel" ref={mainPanel}>
                <AdminNavbar />
                <div className="content">
                  <Switch>{getRoutes(routes)}</Switch>
                </div>
                
              </div>
            </div>
          </>
        );
      }
      else {
        return (
          <>
            <div className="wrapper">
              <div className="main-panel" ref={mainPanel}>
                <AdminNavbar />
                <div className="content">
                  <Container fluid>
                    <h1> Necesitas estar logueado como owner para poder acceder a la vista</h1>
                    <Link to="/main" className="btn btn-primary">Volver</Link>
                  </Container>
                </div>
                
              </div>
            </div>
          </>

        );
      }
    }
  }
  
}

export default AdminView;
