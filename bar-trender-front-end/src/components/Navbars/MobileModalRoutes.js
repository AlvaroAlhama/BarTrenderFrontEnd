// Routing
import Dashboard from "views/Dashboard.js";
import PremiumDashboard from "views/PremiumDashboard.js";
import Upgrade from "views/Upgrade.js";
import Establishments from "views/EstablishmentByOwnerView.js";
import EstablishmentView from "views/EstablishmentView";
import EditOwnerProfile from "components/EditOwnerProfile.js"
import MainView from "views/MainView.js";
import React from "react";
import { useLocation, NavLink } from "react-router-dom";

import { useEffect, useState } from "react";


function MobileModalRoutes(props, { color, image }) {
  
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
      await fetch("https://main-backend-ppl.herokuapp.com/v1/establishments/get_by_owner", {

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

          routes.push(
            {
              path: "/main",
              name: "Página Principal",
              icon: "nc-icon nc-circle-09",
              component: MainView,
              layout: "",
            }
          )
 
          setAppState({ loading: false, establishments: establishments, 
            routes: routes
          });
        });
        
    }
    
    getEstablishmentsOwner()
    
  }, [setAppState]);

  if (appState.routes === undefined) { return null }
  return(
      <>
    {appState.routes.map((prop, key) => {
        if (!prop.redirect)
          return (
            <li
              className={
                prop.upgrade
                  ? "active active-pro"
                  : activeRoute(prop.layout + prop.path)
              }
              key={key}
              style={{listStyleType:"none"}}
            >
              <NavLink
                to={prop.layout + prop.path}
                className="nav-link"
                activeClassName="active"
                onClick={props.onHide}
              >
                <h3>{prop.name}</h3>
              </NavLink>
            </li>
          );
        return null;
      })}
      </>
  )
} export default MobileModalRoutes