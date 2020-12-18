/*! Developed by Alinon */
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Modal,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import Header from "components/Manager/Headers/DashboardHeader.js";
// import Roles from "./Popups/Roles.js"

class ManagerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentModel: false,
      roleModel: false,
      userModel: false,
      toggleDropdown: false,
    };
  }
  toggleModal = state => {
    console.log(state);
    this.setState({
      [state]: !this.state[state]
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
                      <h3 className="mb-0">Current Standards</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="/manager/standards"
                        onClick={"/manager/standards"}
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
            <Col xl="5">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Uploaded Documents</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="/manager/audits"
                        onClick={"/manager/audits"}
                        size="sm"
                      >
                        See all
                      </Button>
                      <Button
                        color="success"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        Add Document
                      </Button>
                      <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.documentModel}
                        toggle={() => this.toggleModal("documentModel")}
                      >
                        <div className="modal-header">
                          <h2 className="modal-title" id="documentModelLabel">
                            Add Document
                          </h2>
                          <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("documentModel")}
                          >
                            <span aria-hidden={true}>×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="recipient-name" class="col-form-label">Name:</label>
                              <input type="text" class="form-control" id="recipient-name"></input>
                            </div>
                            <div class="form-group">
                              <label for="message-text" class="col-form-label">Description:</label>
                              <textarea class="form-control" id="message-text"></textarea>
                            </div>
                            <div className="align-items-center">
                              <Button color="primary" type="button">
                                Choose File
                            </Button>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("documentModel")}
                          >
                            Cancel
                          </Button>
                          <Button color="success" type="button">
                            Upload
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Size</th>
                      <th scope="col">Uploaded On</th>
                      <th scope="col">Accepted</th>
                      <th scope="col">Assigned Roles</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <Modal
                    size="sm"
                    className="modal-dialog-centered"
                    isOpen={this.state.roleModel}
                    toggle={() => this.toggleModal("roleModel")}
                  >
                    <div className="modal-header">
                      <h2 className="modal-title" id="roleModelLabel">
                        Add/Remove Role
                          </h2>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("roleModel")}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <Row>
                        <Col sm="auto">
                          <h4><span class="badge badge-primary">Reception</span>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                            >
                              <span class="badge badge-warning" aria-hidden={true}>×</span>
                            </button>
                          </h4>
                        </Col>
                      </Row>
                      <br></br>
                      <Row className="justify-content-md-center">
                        <Col xl="auto">
                          <Dropdown isOpen={this.state.toggleDropdown} toggle={() => this.toggleModal("toggleDropdown")}>
                            <DropdownToggle caret>
                              Select Roles
                              </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem disabled>Reception</DropdownItem>
                              <DropdownItem>Human Resources</DropdownItem>
                              <DropdownItem>Supervisor</DropdownItem>
                              <DropdownItem>Finance Head</DropdownItem>
                              <DropdownItem>Dormitory Manager</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </Col>
                      </Row>
                    </div>
                    <div className="modal-footer">
                      <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("roleModel")}
                      >
                        Cancel
                          </Button>
                      <Button color="success" type="button">
                        Save
                          </Button>
                    </div>
                  </Modal>
                  <tbody>
                    <tr>
                      <th scope="row">Company Insurance</th>
                      <td>78 KB</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">12/5/2020</span>
                        </div>
                      </td>
                      <td>3 / 5</td>
                      <td>
                        <h4><span className="badge badge-primary">Reception</span></h4>
                      </td>
                      <td>
                        <Button
                          color="primary"
                          onClick={() => this.toggleModal("roleModel")}
                          size="sm"
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="primary"
                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Employee Legislation</th>
                      <td>98 KB</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">12/1/2020</span>
                        </div>
                      </td>
                      <td>4 / 5</td>
                      <td>
                        <h4><span className="badge badge-primary">Human Resources</span></h4>
                      </td>
                      <td>
                        <Button
                          color="primary"

                          onClick={() => this.toggleModal("roleModel")}
                          size="sm"
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="primary"

                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Food Legislation</th>
                      <td>25 KB</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">11/28/2020</span>
                        </div>
                      </td>
                      <td>3 / 5</td>
                      <td>
                        <h4> <span className="badge badge-primary">Supervisor</span></h4>
                      </td>
                      <td>
                        <Button
                          color="primary"

                          onClick={() => this.toggleModal("roleModel")}
                          size="sm"
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="primary"

                          onClick={e => e.preventDefault()}
                          size="sm"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Car Verification</th>
                      <td>78 KB</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">10/11/2020</span>
                        </div>
                      </td>
                      <td>5 / 5</td>
                      <td>
                        <h4><span className="badge badge-primary">Finance Head</span></h4>
                      </td>
                      <td>
                        <Button
                          color="primary"

                          onClick={() => this.toggleModal("roleModel")}
                          size="sm"
                        >
                          Edit
                        </Button>
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
                      <th scope="row">Fumigation</th>
                      <td>113 KB</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">11/10/2020</span>
                        </div>
                      </td>
                      <td>1 / 5</td>
                      <td>
                        <h4><span className="badge badge-primary">Dormitory Manager</span></h4>
                      </td>
                      <td>
                        <Button
                          color="primary"

                          onClick={() => this.toggleModal("roleModel")}
                          size="sm"
                        >
                          Edit
                        </Button>
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
                        href="/manager/audits"
                        onClick={"/manager/audits"}
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
                        href="/manager/workflows"
                        onClick={"/manager/workflows"}
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
                        href="/manager/users"
                        onClick={"/manager/users"}
                        size="sm"
                      >
                        See all
                      </Button>
                      <Button
                        color="success"
                        onClick={() => this.toggleModal("userModel")}
                        size="sm"
                      >
                        Add User
                      </Button>
                      <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.userModel}
                        toggle={() => this.toggleModal("userModel")}
                      >
                        <div className="modal-header">
                          <h2 className="modal-title" id="userModelLabel">
                            Add User
                          </h2>
                          <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("userModelModel")}
                          >
                            <span aria-hidden={true}>×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div class="form-group">
                              <label for="recipient-name" class="col-form-label">Name:</label>
                              <input type="text" class="form-control" id="recipient-name"></input>
                            </div>
                            <div class="form-group">
                              <label for="recipient-name" class="col-form-label">Email:</label>
                              <input type="text" class="form-control" id="recipient-name"></input>
                            </div>
                            <div class="form-group">
                              <label for="message-text" class="col-form-label">About:</label>
                              <textarea class="form-control" id="message-text"></textarea>
                            </div>
                            <Row>
                              <Col sm={{size: "auto"}}>
                              <label for="recipient-name" class="col-form-label">Password:</label>
                              </Col>
                              <Col>
                              <div className="align-items-center">
                                <Button color="primary" type="button">
                                  Auto Generate
                                </Button>
                              </div>
                              </Col>
                            </Row>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("userModel")}
                          >
                            Cancel
                          </Button>
                          <Button color="success" type="button">
                            Save
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Assigned Workflow</th>
                      <th scope="col">Assigned Audit</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Will Cole</th>
                      <td>
                        <h3><span className="badge badge-primary">Supervisor</span></h3>
                      </td>
                      <td>2</td>
                      <td>
                        3
                      </td>
                      <td>
                        <Button
                          color="primary"
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
                        <h3><span className="badge badge-primary">Finance Head</span></h3>
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
                        <h3><span className="badge badge-primary">Insurance Agent</span></h3>
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
                        <h3><span className="badge badge-primary">Recruitment Officer</span></h3>
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
                        <h3><span className="badge badge-primary">Flight Attendant</span></h3>
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

export default ManagerIndex;
