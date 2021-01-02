/*! Developed by Alinon */
import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';

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
      documentModel: false,
      documents: [],
      uploadDocument: null
    };
  }

  componentDidMount() {
    //Check if auth token in valid
    let userId = reactLocalStorage.get('userId', true);
    let clientId = reactLocalStorage.get('clientId', true);

    //console.warn('user ' + userId + 'client ' + clientId);

    if (clientId != null && userId != null) {
      const data = {
        "clientId": clientId,
        "userId": userId
      }
      axios.post(constants["apiUrl"] + '/dashboard/get', data)
        .then((res) => {
          let data = res.data;
          console.warn(JSON.stringify(data.documents));
          this.setState({
            documents: data.documents,
          })
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    } else {
      //TODO: go back to login
    }
  }

  toggleModal = state => {
    console.log(state);
    this.setState({
      [state]: !this.state[state]
    });
  };

  handleDocumentName = (event) => {
    this.setState({ documentName: event.target.value });
    //console.warn(this.state.documentName)
  }

  handleDocumentDesc = (event) => {
    this.setState({ documentDesc: event.target.value });
  }

  chooseFile = (event) => {
    this.setState({
      uploadDocument: event.target.files[0]
    });
  }

  handleUpload = () => {
    let userId = reactLocalStorage.get('userId', true);
    let clientId = reactLocalStorage.get('clientId', true);

    //console.warn('user ' + userId + 'client ' + clientId);


    if (clientId != null && userId != null) {
      let data = new FormData();

      data.append("clientId", clientId);
      data.append("userId", userId);
      data.append("name", this.state.documentName);
      data.append("desc", this.state.documentDesc);
      data.append("file", this.state.uploadDocument);

      axios.post(constants["apiUrl"] + '/documents/upload', data)
        .then((res) => {
          let data = res.data;
          //console.warn(JSON.stringify(res.data));
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }

    this.setState({
      documentName: '',
      documentDesc: '',
      uploadDocument: null,
      documentModel: false,
    })
  }


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
                        href="#add document"
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
                              <input type="text" class="form-control" id="recipient-name" onChange={this.handleDocumentName}></input>
                            </div>
                            <div class="form-group">
                              <label for="message-text" class="col-form-label" onChange={this.handleDocumentDesc}>Description:</label>
                              <textarea class="form-control" id="message-text"></textarea>
                            </div>
                            <div className="align-items-center">
                              {/* <Button color="primary" type="button">
                                Choose File
                            </Button> */}
                              <input type="file" name="file" onChange={e => this.chooseFile(e)} />
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
                          <Button color="success" type="button" onClick={this.handleUpload}>
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
                    {this.state.documents.map(doc => {
                      // const date = moment(doc.updated_at).format('DD MMM, YYYY');
                      const date = new Date(doc.updated_at).toLocaleString();
                      return (
                        <tr>
                          <th scope="row">{doc.name}</th>
                          <td>{doc.size} KB</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">{date}</span>
                            </div>
                          </td>
                          <td>{doc.acceptedCount}/{doc.acceptedTotal}</td>
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
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                              size="sm"
                            >
                              View
                        </Button>
                          </td>
                        </tr>
                      )
                    })}
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
