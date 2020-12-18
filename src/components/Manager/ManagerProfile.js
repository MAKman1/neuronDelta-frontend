/*! Developed by Alinon */
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components

import Header from "components/Manager/Headers/ProfileHeader.js";

class ManagerProfile extends React.Component {
  render() {
    return (
      <>
        <Header/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="5">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>
                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>
                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Jessica Jones
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      jessicajones@gmail.com
                    </div>
                    <div className="h5 mt-5">
                      <i className="ni business_briefcase-24 mr-2" />
                      Ankara Sehir Hastanesi
                    </div>
                    <div className="">
                      <i className="ni business_briefcase-24 mr-2" />
                      <span class="badge badge-primary">Manager</span>

                      <span class="badge badge-primary">Doctor</span>

                      <span class="badge badge-primary">HealthExpert</span>
                    </div>
                    <hr className="my-4" />
                    <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="m"
                      >
                        Edit Profile
                      </Button>
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

export default ManagerProfile;