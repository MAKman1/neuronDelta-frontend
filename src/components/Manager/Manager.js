/*! Developed by Alinon */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import ManagerNavbar from "components/Manager/ManagerNavbar.js";
// import AdminFooter from "components/Footers/AdminFooter.js";
import ManagerSidebar from "components/Manager/ManagerSidebar.js";
import ManagerFooter from "components/Manager/ManagerFooter.js"

import routes from "routes.js";

class Manager extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/manager") {
        return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
      } 
      else {
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
        <ManagerSidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/manager/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <ManagerNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/manager/index" />
          </Switch>
          <Container fluid>
            <ManagerFooter/>
          </Container>
        </div>
      </>
    );
  }
}

export default Manager;
