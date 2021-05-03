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
import Upgrade from "views/Upgrade.js";
import EditOwnerProfile from "components/EditOwnerProfile.js"

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

  {
    path: "/myProfile",
    name: "Mi Perfil",
    icon: "nc-icon nc-chart-pie-35",
    component: EditOwnerProfile,
    layout: "/admin",
  },

]
export default dashboardRoutes;
