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
import Dashboard from "views/Dashboard.js";
import PremiumDashboard from "views/PremiumDashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";

import EstablishmentView from "views/EstablishmentView"
import Establishments from "views/EstablishmentByOwnerView"

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Compra la version premium",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Tu perfil",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Tus Establecimientos",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Ranking de cervezas",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Mejores elementos de ocio",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Tipos de establecimientos",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/main",
    name: "Pagina principal",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },

  {

    path: "/myEstablishments",
    name: "Establishments",
    icon: "nc-icon nc-bell-55",
    component: Establishments,
    layout: "/admin",
  },
  {
    path: "/establishment/:id",
    name: "Establishments",
    icon: "nc-icon nc-bell-55",
    component: EstablishmentView,
    layout: "/admin",
  },

  {
    path: "/premiumDashboard",
    name: "Premium Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: PremiumDashboard,
    layout: "/admin",
  },


export default dashboardRoutes;
