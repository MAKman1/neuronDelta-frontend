/*! Developed by Alinon */
import React from "react";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class EmptyHeader extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-4 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
                <Row>
					          <h1 className="text-white" style={{paddingLeft: 15, paddingBottom: 50}}>Jacobs & Sons</h1>
                </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default EmptyHeader;
