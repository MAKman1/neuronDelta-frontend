/*! Developed by Alinon */
import React from "react";

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


import Header from "components/Manager/Headers/EmptyHeader.js";

class ManagerDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentModel: false
    };
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col xl>
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Uploaded Documents</h3>
                    </div>
                    <div className="col text-right">

                      <Button
                        color="success"
                        href="#pablo"
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
                          href="#pablo"
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
                          href="#pablo"
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
                          href="#pablo"
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
                          href="#pablo"
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
                          href="#pablo"
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
        </Container>
      </>
    );
  }
}

export default ManagerDocuments;
