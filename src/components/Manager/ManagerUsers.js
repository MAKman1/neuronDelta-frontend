/*! Developed by Alinon */
import React from "react";

// reactstrap components
import {
  Col,
  Card,
  CardHeader,
  Row,
  Modal,
  Table,
  Button,
  Container,
} from "reactstrap";

import Header from "components/Manager/Headers/EmptyHeader.js";

class ManagerUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userModel: false,
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
                              <Col sm={{ size: "auto" }}>
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

export default ManagerUsers;
