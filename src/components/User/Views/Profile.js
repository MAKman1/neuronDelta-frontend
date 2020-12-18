/*! Developed by Alinon */
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "../Headers/EmptyHeader";

class Profile extends React.Component {
  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--5" fluid>
          <Row className="justify-content-center">
            <Col className="order-xl-2 mb-5 mb-xl-0 " xl="4">
              <Card className="card-profile shadow">
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 bg-gradient-info">
                  <div className="d-flex justify-content-center" >
                    <h1 style={{color: 'white'}}>
                      Jessica Jones
                    </h1>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <h3>
                      jessica.jones@gmail.com
                    </h3>
                    <h3>
                      Client
                    </h3>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
} 

export default Profile;
