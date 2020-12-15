/*! Developed by Alinon */
import React from "react";

// reactstrap components
import {
  Container,
} from "reactstrap";

import Header from "components/Manager/Headers/DashboardHeader.js";

class ManagerUsers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //States
    };
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          
        </Container>
      </>
    );
  }
}

export default ManagerUsers;
