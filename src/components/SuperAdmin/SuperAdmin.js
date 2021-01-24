/*! Developed by Alinon */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";

import Sidebar from "components/SuperAdmin/Bars/Sidebar.js";
import AdminNavbar from "components/SuperAdmin/Bars/Navbar.js";
import Footer from "components/SuperAdmin/Bars/Footer.js";
// core components

import routes from "routes.js";


class SuperAdmin extends React.Component {
	componentDidUpdate(e) {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		this.refs.mainContent.scrollTop = 0;
	}
	getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.layout === "/master" || prop.layout === "/master/view") {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			} else {
				return null;
			}

		});
	};
	getBrandText = path => {
		for (let i = 0; i < routes.length; i++) {
			if (
				this.props.location.pathname.indexOf(
					routes[i].layout + routes[i].path
				) !== -1
			) {
				return routes[i].name;
			}
		}
		return "Brand";
	};
	render() {
		return (
			<>

                    <Sidebar
					{...this.props}
					routes={routes}
					logo={{
						innerLink: "/master/index",
						imgSrc: require("assets/img/brand/argon-react.png"),
						imgAlt: "..."
					}}/>
				
				<div className="main-content" ref="mainContent">
                    <AdminNavbar
						{...this.props}
						brandText={this.getBrandText(this.props.location.pathname)}
					/>
					<Switch>
						{this.getRoutes(routes)}
						<Redirect from="*" to="/master/index" />
					</Switch>
					
                    <Container fluid>
						<Footer />
					</Container>
					
				</div>
			</>
		);
	}
}

export default SuperAdmin;
