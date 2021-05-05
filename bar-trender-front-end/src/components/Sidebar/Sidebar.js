
// Routing
import Dashboard from "views/Dashboard.js";
import PremiumDashboard from "views/PremiumDashboard.js";
import Upgrade from "views/Upgrade.js";
import Establishments from "views/EstablishmentByOwnerView.js";
import EstablishmentView from "views/EstablishmentView";
import EditOwnerProfile from "components/EditOwnerProfile.js"
import React from "react";
import { useLocation, NavLink } from "react-router-dom";


import { Nav } from "react-bootstrap";

import { useEffect, useState } from "react";


function Sidebar({ color, image }) {
  
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  const [appState, setAppState] = useState({
    loading: false,
    establishments: {},
    routes: [{
      path: "/myEstablishments",
      name: "Establishments",
      icon: "nc-icon nc-bell-55",
      component: Establishments,
      layout: "/admin",
    },
    ],
  }
  );

  useEffect(() => {
    setAppState({ loading: true });

    async function getEstablishmentsOwner() {

      var token = sessionStorage.getItem("token");
      await fetch("https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_by_owner", {

        method: "GET",
        headers: {
          "token": token
        }
      })
        .then(response => response.json())
        .then(establishments => {
          
          var routes = [
            {
              path: "/dashboard",
              name: "Dashboard",
              icon: "nc-icon nc-chart-pie-35",
              component: Dashboard,
              layout: "/admin",
            },

            {
              path: "/PremiumDashboard",
              name: "Premium Dashboard",
              icon: "nc-icon nc-chart-pie-35",
              component: PremiumDashboard,
              layout: "/admin",
            },
            {
              upgrade: true,
              path: "/upgrade",
              name: "Desbloquear premium",
              icon: "nc-icon nc-bell-55",
              component: Upgrade,
              layout: "/admin",
            },

            {
              path: "/myProfile",
              name: "Mi Perfil",
              icon: "nc-icon nc-circle-09",
              component: EditOwnerProfile,
              layout: "/admin",
            },
           
          ];

          for (let i = 0; i < establishments.length; i++) {

            routes.push(
              {
                path: "/establishment/"+establishments[i].id,
                name: establishments[i].name_text,
                icon: "nc-icon nc-bell-55",
                component: EstablishmentView,
                layout: "/admin",
              }
            );      
      
          }
 
          setAppState({ loading: false, establishments: establishments, 
            routes: routes
          });
        });
        
    }
    
    getEstablishmentsOwner()
    
  }, [setAppState]);

  if (appState.routes === undefined) { return null }

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")",
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="/main"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={require("../Images/barTrender61.png").default}
                alt="..."
              />
            </div>
          </a>
          <a className="simple-text" href="/main">
            BARTRENDER
          </a>
        </div>
        <Nav>
          
          {appState.routes.map((prop, key) => {
            
            if (!prop.redirect && !(sessionStorage.getItem("premium") === "false" && prop.path === '/PremiumDashboard'))
              return (

                <li
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : activeRoute(prop.layout + prop.path)
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
