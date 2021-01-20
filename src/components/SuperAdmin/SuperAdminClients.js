/*! Developed by Alinon */
import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';

// reactstrap components
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  Row,
  Modal,
  Table,
  Button,
  Container,
  Spinner
} from "reactstrap";

import Header from "components/Manager/Headers/EmptyHeader.js";

class SuperAdminClients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      addModal: false,
      clients: [],
      name: "",
      website: "",
      description: "",
    };
  }

  componentDidMount() {
    axios.post(constants["apiUrl"] + '/admin/getClients')
      .then((res) => {
        let data = res.data;
        this.setState({
          clients: data.clients,
          loading: false
        })
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });
  }

  openAddModal = () => {
    this.setState({
      addModal: true,
    })
  }

  closeAddModal = () => {
    this.setState({
      addModal: false,
    })
  }

  handleName = () => {

  }

  handleDesc = () => {

  }

  handleWebsite = () => {

  }






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
                      <h3 className="mb-0">Clients</h3>
                    </div>
                    <div className="col text-right">
                      <Button color="success" onClick={() => this.openAddModal()} size="md">
                        Add Client
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                {this.state.loading ?
                  <CardBody>
                    <div style={{ borderColor: 'black' }} className="text-center">
                      <Spinner st color="primary" />
                    </div>
                  </CardBody>
                  :
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">User Count</th>
                        <th scope="col">Description</th>
                        <th scope="col">Website</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.clients.map((client, index) => {
                        return (
                          <tr>
                            <th scope="row">
                              {client.name}
                            </th>
                            <td>
                              {client.user_count ? client.user_count : "-" }
                            </td>
                            <td style={{ maxWidth: 150 }}>
                              <text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                {client.description ? client.description : "-"}
                              </text>
                            </td>
                            <td>
                                {client.website}
                            </td>
                            <td>
                              <Link to={{
                                pathname: '/superadmin/view/client/' + 2,
                              }}>
                                <Button color="primary" size="sm">
                                  View
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                }
              </Card>
              <Modal
                className="modal-dialog-centered"
                isOpen={this.state.addModal}
                defaultValue={this.state.addModal}
                toggle={() => this.closeAddModal()}
              >
                <div className="modal-header">
                  <h2 className="modal-title" id="assignModelLabel">
                    Add New Client
                                </h2>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.closeAddModal()}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label for="recipient-name" defaultValue={this.state.name} class="col-form-label" >Name:</label>
                      <input type="text" class="form-control" id="recipient-name" onChange={this.handleName}></input>
                    </div>
                    <div class="form-group">
                      <label for="message-text" class="col-form-label" defaultValue={this.state.desc}>Description:</label>
                      <textarea class="form-control" id="message-text" id="message-text" onChange={this.handleDesc}></textarea>
                    </div>
                    <div className="form-group">
                      <label for="recipient-website" defaultValue={this.state.version} class="col-form-label" >Website</label>
                      <input type="link" class="form-control" id="recipient-website" onChange={this.handleWebsite}></input>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.closeAddModal()}>
                    Cancel
                  </Button>
                  <Button color="success" type="button" onClick={() => this.handleAdd()}>
                    Add
                  </Button>
                </div>
              </Modal>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SuperAdminClients;