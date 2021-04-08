
// Routing
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Establishments from "views/EstablishmentByOwnerView.js";
import EstablishmentView from "views/EstablishmentView";
import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";


import { Nav } from "react-bootstrap";

import logo from "assets/img/reactlogo.png";
import { useEffect, useState } from "react";

import logoBartrender from "../Images/barTrender61.png";

function Sidebar({ color, image }) {
  
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // Getting establishments and adding links 
  // var routes = [
  //   {
  //     upgrade: true,
  //     path: "/upgrade",
  //     name: "Upgrade to PRO",
  //     icon: "nc-icon nc-alien-33",
  //     component: Upgrade,
  //     layout: "/admin",
  //   },
  //   {
  //     path: "/dashboard",
  //     name: "Dashboard",
  //     icon: "nc-icon nc-chart-pie-35",
  //     component: Dashboard,
  //     layout: "/admin",
  //   },
  //   // {
  //   //   path: "/user",
  //   //   name: "User Profile",
  //   //   icon: "nc-icon nc-circle-09",
  //   //   component: UserProfile,
  //   //   layout: "/admin",
  //   // },
  //   // {
  //   //   path: "/table",
  //   //   name: "Table List",
  //   //   icon: "nc-icon nc-notes",
  //   //   component: TableList,
  //   //   layout: "/admin",
  //   // },
  //   // {
  //   //   path: "/typography",
  //   //   name: "Typography",
  //   //   icon: "nc-icon nc-paper-2",
  //   //   component: Typography,
  //   //   layout: "/admin",
  //   // },
  //   // {
  //   //   path: "/icons",
  //   //   name: "Icons",
  //   //   icon: "nc-icon nc-atom",
  //   //   component: Icons,
  //   //   layout: "/admin",
  //   // },
  //   // {
  //   //   path: "/maps",
  //   //   name: "Maps",
  //   //   icon: "nc-icon nc-pin-3",
  //   //   component: Maps,
  //   //   layout: "/admin",
  //   // },
  //   // {
  //   //   path: "/notifications",
  //   //   name: "Notifications",
  //   //   icon: "nc-icon nc-bell-55",
  //   //   component: Notifications,
  //   //   layout: "/admin",
  //   // },
  //   {
  //     path: "/myEstablishments",
  //     name: "Establishments",
  //     icon: "nc-icon nc-bell-55",
  //     component: Establishments,
  //     layout: "/admin",
  //   },
  //   {
  //     path: "/establishment/:id",
  //     name: "Establishments",
  //     icon: "nc-icon nc-bell-55",
  //     component: EstablishmentView,
  //     layout: "/admin",
  //   },

  // ];
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
              upgrade: true,
              path: "/upgrade",
              name: "Desbloquear premium",
              icon: "nc-icon nc-bell-55",
              component: Upgrade,
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
          <a className="simple-text" href="#">
            BARTRENDER
          </a>
        </div>
        <Nav>
          
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
