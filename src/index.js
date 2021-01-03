/*! Developed by Alinon */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import { Worker } from '@react-pdf-viewer/core';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "components/Login/Auth.js";
import ManagerLayout from "components/Manager/Manager.js";
import UserLayout from "components/User/User.js";


ReactDOM.render(
	<Worker
		workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js"
	>
		<BrowserRouter>
			<Switch>
				<Route path="/admin" render={props => <AdminLayout {...props} />} />
				<Route path="/manager" render={props => <ManagerLayout {...props} />} />
				<Route path="/user" render={props => <UserLayout {...props} />} />

				<Route path="/login" render={props => <AuthLayout {...props} />} />

				<Redirect from="/" to="/login" />
			</Switch>
		</BrowserRouter>
	</Worker>,
	document.getElementById("root")
);  
