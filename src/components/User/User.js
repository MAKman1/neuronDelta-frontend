/*! Developed by Alinon */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import UserNavbar from "components/User/UserNavebar.js";
import UserFooter from "components/User/UserFooter";
import UserSidebar from "components/User/UserSidebar.js";

import routes from "routes.js";

class User extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/user" || prop.layout === "/user/view") {
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
        <UserSidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/user/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <UserNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/user/index" />
          </Switch>
          <Container fluid>
            <UserFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default User;
