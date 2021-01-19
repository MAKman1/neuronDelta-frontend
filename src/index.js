/*! Developed by Alinon */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "components/Login/Auth.js";
import ManagerLayout from "components/Manager/Manager.js";
import UserLayout from "components/User/User.js";
import SuperAdminLayout from "components/SuperAdmin/SuperAdmin.js";


ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path="/admin" render={props => <AdminLayout {...props} />} />
			<Route path="/manager" render={props => <ManagerLayout {...props} />} />
			<Route path="/user" render={props => <UserLayout {...props} />} />
			<Route path="/superadmin" render={props => <SuperAdminLayout {...props} />} />
			<Route path="/login" render={props => <AuthLayout {...props} />} />

			<Redirect from="/" to="/login" />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);  
