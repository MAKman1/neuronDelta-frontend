/*! Developed by Alinon */
// import Index from "views/Index.js";
import UserIndex from "components/User/UserIndex.js";
import ManagerIndex from "components/Manager/ManagerIndex.js";
import ManagerWorkflows from "components/Manager/ManagerWorkflows.js";
import ManagerStandards from "components/Manager/ManagerStandards.js";
import ManagerUsers from "components/Manager/ManagerUsers.js"
import ManagerSubscriptions from "components/Manager/ManagerSubscriptions.js";
import ManagerDocuments from "components/Manager/ManagerDocuments.js";
import ManagerProfile from "components/Manager/ManagerProfile.js";
import ManagerArticle from "components/Manager/ManagerArticle.js";


import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import ManagerAudits from "components/Manager/ManagerAudits";

// User Imports
import Audit from "components/User/Views/Audit.js"
import Document from "components/User/Views/Document.js"
import Workflows from "components/User/Views/Workflows.js"
import Profile from "components/User/Views/Profile.js";



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
    path: "/profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: ManagerProfile,
    layout: "/manager"
  },
  {
    path: "/docs",
    name: "Documents",
    icon: "ni ni-single-copy-04 text-red",
    component: ManagerDocuments,
    layout: "/manager"
  },
  {
    path: "/standards",
    name: "Standards",
    icon: "ni ni-book-bookmark text-green",
    component: ManagerStandards,
    layout: "/manager"
  },
  {
    path: "/audit",
    name: "Article",
    icon: "ni ni-collection text-blue",
    component: ManagerAudits,
    layout: "/manager"
  },

  {
    path: "/workflows",
    name: "Workflows",
    icon: "ni ni-check-bold text-orange",
    component: ManagerWorkflows,
    layout: "/manager"
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-single-02 text-yellow",
    component: ManagerUsers,
    layout: "/manager"
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    icon: "ni ni-single-copy-04 text-red",
    component: ManagerSubscriptions,
    layout: "/manager"
  },

  {
    path: "/article",
    component: ManagerArticle,
    layout: "/manager/audit"
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
    path: "/workflow",
    name: "Workflows",
    icon: "ni ni-check-bold text-orange",
    component: Workflows,
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
