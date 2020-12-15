/*! Developed by Alinon */
import React from "react";

import {
  Container,
} from "reactstrap";


import Header from "components/Manager/Headers/DashboardHeader.js";

class ManagerDocuments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //
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

export default ManagerDocuments;
