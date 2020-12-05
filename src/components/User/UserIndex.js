/*! Developed by Alinon */
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";

import Header from "components/User/Headers/DashboardHeader.js";

class UserIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="7">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Assigned Audits</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Assigned By</th>
                      <th scope="col">Due By</th>
                      <th scope="col">Standard</th>
                      <th scope="col">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Food Quality 1.1</th>
                      <td>James Smith</td>
                      <td>12-2-2020</td>
                      <td>Food Legislation </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Tax Payment</th>
                      <td>Maria Garcia</td>
                      <td>1-3-2021</td>
                      <td>National Tax Payment </td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        40,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Fumigation Details</th>
                      <td>David Smith</td>
                      <td>21-4-2021</td>
                      <td>Fumigation Law </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Food Quality 1.1</th>
                      <td>James Smith</td>
                      <td>12-2-2020</td>
                      <td>Food Legislation </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Tax Payment</th>
                      <td>Maria Garcia</td>
                      <td>1-3-2021</td>
                      <td>National Tax Payment </td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        40,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="5">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Assigned Documents</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">File Size</th>
                      <th scope="col">Assigned By</th>
                      <th className="text-center" scope="col">Accepted</th>
                      <th className="text-center" scope="col">File</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Mark Smith</th>
                      <td>3 Mb</td>
                      <th >Denver Louis</th>
                      <td className="text-center"><i class="fas fa-check"></i></td>
                      <td className="text-center">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Maria Gracia</th>
                      <td>5.5 Mb</td>
                      <th >James Smith</th>
                      <td className="text-center"><i class="fas fa-check"></i></td>
                      <td className="text-center">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Lillian Foard</th>
                      <td>5.5 Mb</td>
                      <th >John Doe</th>
                      <td className="text-center">
                        <Button
                          color="success"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          Accept
                        </Button>
                      </td>
                      <td className="text-center">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Alfred Ansari</th>
                      <td>3 Mb</td>
                      <th >Loise Behler</th>
                      <td className="text-center"><i class="fas fa-check"></i></td>
                      <td className="text-center">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
          <Col xl>
            <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Assigned Checklists</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Assigned By</th>
                      <th scope="col">Due By</th>
                      <th scope="col">Standard</th>
                      <th scope="col">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">HR Interview Round 1</th>
                      <td>Lillian Foard</td>  
                      <td>13-6-2021</td>
                      <td>Human Resource Law</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Car Repair</th>
                      <td>Denver Louis</td>  
                      <td>4-8-2021</td>
                      <td>Car Verification</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        41,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Sanitation 1.1</th>
                      <td>Maria Gracia</td>  
                      <td>22-5-2021</td>
                      <td>Fumigation Law</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        43,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default UserIndex;
