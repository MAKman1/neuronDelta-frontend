/*! Developed by Alinon */
// import Index from "views/Index.js";
import UserIndex from "components/User/UserIndex.js";
import ManagerIndex from "components/Manager/ManagerIndex.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

// User Imports
import Audit from "components/User/Views/Audit.js"
import Document from "components/User/Views/Document.js"
import Checklist from "components/User/Views/Checklist.js"

// Manager Imports
// import Audit from "views/User/Audit.js"
// import Document from "views/User/Document.js"

var routes = [
  // Manager
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: ManagerIndex,
    layout: "/manager"
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/manager"
  },
  {
    path: "/docs",
    name: "Documents",
    icon: "ni ni-single-copy-04 text-red",
    component: Tables,
    layout: "/manager"
  },
  {
    path: "/standards",
    name: "Standards",
    icon: "ni ni-collection text-blue",
    component: Icons,
    layout: "/manager"
  },
  {
    path: "/audit",
    name: "Audit",
    icon: "ni ni-collection text-blue",
    component: Icons,
    layout: "/manager"
  },
  {
    path: "/checklist",
    name: "Workflows",
    icon: "ni ni-check-bold text-orange",
    component: Maps,
    layout: "/manager"
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-single-02 text-yellow",
    component: Maps,
    layout: "/manager"
  },
  {
    path: "/users",
    name: "Subscriptions",
    icon: "ni ni-single-copy-04 text-red",
    component: Maps,
    layout: "/manager"
  },


  // User
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: UserIndex,
    layout: "/user"
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/user"
  },
  {
    path: "/audit",
    name: "Audits",
    icon: "ni ni-collection text-blue",
    component: Audit,
    layout: "/user"
  },
  {
    path: "/checklist",
    name: "Workflows",
    icon: "ni ni-check-bold text-orange",
    component: Checklist,
    layout: "/user"
  },
 
  {
    path: "/docs",
    name: "Documents",
    icon: "ni ni-single-copy-04 text-red",
    component: Document,
    layout: "/user"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
export default routes;
