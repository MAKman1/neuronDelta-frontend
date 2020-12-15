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

import Header from "components/Manager/Headers/DashboardHeader.js";

class ManagerStandards extends React.Component {
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
          <Row className = "mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Current Standards</h3>
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
                      <th scope="col">Article Count</th>
                      <th scope="col">Details</th>
                      <th scope="col">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Food Legislation</th>
                      <td>46</td>
                      <td>75</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Fumigation Law</th>
                      <td>23</td>
                      <td>45</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Can Verification</th>
                      <td>19</td>
                      <td>81</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Restaurant Sanitation</th>
                      <td>56</td>
                      <td>94</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Income Tax Payment</th>
                      <td>104</td>
                      <td>158</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Uploaded Documents</h3>
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
                      <th scope="col">Size</th>
                      <th scope="col">Uploaded On</th>
                      <th scope="col">Assigned Roles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Company Insurance</th>
                      <td>78</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">12/5/2020</span>
                        </div>
                      </td>
                      <td>
                        <h4><span class="badge badge-primary">Reception</span></h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Employee Legislation</th>
                      <td>98</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">12/1/2020</span>
                        </div>
                      </td>
                      <td>
                      <h4><span class="badge badge-primary">Human Resources</span></h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Food Legislation</th>
                      <td>25</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">11/28/2020</span>
                        </div>
                      </td>
                      <td>
                        <h4> <span class="badge badge-primary">Supervisor</span></h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Car Verification</th>
                      <td>78</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">10/11/2020</span>
                        </div>
                      </td>
                      <td>
                        <h4><span class="badge badge-primary">Finance Head</span></h4>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Fumigation</th>
                      <td>78</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">11/10/2020</span>
                        </div>
                      </td>
                      <td>
                        <h4><span class="badge badge-primary">Dormitory Manager</span></h4>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Audits</h3>
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
                      <th scope="col">Assigned To</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Standards</th>
                      <th scope="col">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Food Quality 1.3</th>
                      <td>
                        Will Cole
                      </td>
                      <td>12/07/2020</td>
                      <td>
                        Food Legislation
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        85.65%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Tax Audit 2.1</th>
                      <td>
                        Henry Greysmith
                      </td>
                      <td>12/20/2020</td>
                      <td>
                        Income Tax Audit
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        65.12%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Car Quality 1.3</th>
                      <td>
                        Martha Stewart
                      </td>
                      <td>12/26/2020</td>
                      <td>
                        Car Registration
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46.78%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Vehicle Tax 1.7</th>
                      <td>
                        Saima Malik
                      </td>
                      <td>01/04/2021</td>
                      <td>
                        Car Registration
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        21.82%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Fumigation Law 4.3</th>
                      <td>
                        Sakamato Yui
                      </td>
                      <td>01/10/2021</td>
                      <td>
                        Fumigation Quality
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        10.53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Workflows</h3>
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
                      <th scope="col">Assigned To</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Workflow</th>
                      <th scope="col">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <th scope="row">Food Quality 1.3</th>
                      <td>
                        Will Cole
                      </td>
                      <td>12/07/2020</td>
                      <td>
                        Product Launch
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        85.65%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Tax Audit 2.1</th>
                      <td>
                        Henry Greysmith
                      </td>
                      <td>12/20/2020</td>
                      <td>
                        Tax Approval
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        65.12%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Car Quality 1.3</th>
                      <td>
                        Martha Stewart
                      </td>
                      <td>12/26/2020</td>
                      <td>
                        Insurance Verification
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46.78%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Vehicle Tax 1.7</th>
                      <td>
                        Saima Malik
                      </td>
                      <td>01/04/2021</td>
                      <td>
                        Recruitment
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        21.82%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Fumigation Law 4.3</th>
                      <td>
                        Sakamato Yui
                      </td>
                      <td>01/10/2021</td>
                      <td>
                        Pre-Flight Approval
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        10.53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Users</h3>
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
                      <th scope="col">Role</th>
                      <th scope="col">Assigned List</th>
                      <th scope="col">Assigned Audit</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <th scope="row">Will Cole</th>
                      <td>
                        <h3><span class="badge badge-primary">Supervisor</span></h3>
                      </td>
                      <td>2</td>
                      <td>
                        3
                      </td>
                      <td>
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
                      <th scope="row">Henry Greysmith</th>
                      <td>
                        <h3><span class="badge badge-primary">Finance Head</span></h3>
                      </td>
                      <td>1</td>
                      <td>
                        1
                      </td>
                      <td>
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
                      <th scope="row">Martha Stewart</th>
                      <td>
                        <h3><span class="badge badge-primary">Insurance Agent</span></h3>
                      </td>
                      <td>4</td>
                      <td>
                        2
                      </td>
                      <td>
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
                      <th scope="row">Saima Malik</th>
                      <td>
                        <h3><span class="badge badge-primary">Recruitment Officer</span></h3>
                      </td>
                      <td>5</td>
                      <td>
                        4
                      </td>
                      <td>
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
                      <th scope="row">Sakamato Yui</th>
                      <td>
                        <h3><span class="badge badge-primary">Flight Attendant</span></h3>
                      </td>
                      <td>3</td>
                      <td>
                        5
                      </td>
                      <td>
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
        </Container>
      </>
    );
  }
}

export default ManagerStandards;
