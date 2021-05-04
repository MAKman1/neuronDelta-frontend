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
  Spinner,
} from "reactstrap";

import Header from "components/Manager/Headers/EmptyHeader.js";
import { invalid } from "moment";

class SuperAdminClients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      addModal: false,
      editModal: false,
      invalid: false,
      currentClient: null,
      clientIndex: null,
      clients: [],
      name: "",
      website: "",
      description: "",
      userCount: 5,
    };
  }

  componentDidMount() {

    let type = reactLocalStorage.get('userType', true);


    if (type == 3) {
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
    } else {
      this.props.history.push("/login");
    }

    
  }

  openAddModal = () => {
    this.setState({
      addModal: true,
    })
  }

  openEditModal = (client, index) => {
    this.setState({
      editModal: true,
      currentClient: client,
      clientIndex: index
    })
  }

  closeAddModal = () => {
    this.setState({
      addModal: false,
      name: '',
      description: '',
      website: '',
      userCount: 5,
      invalid: false
    })
  }

  closeEditModal = () => {
    this.setState({
      editModal: false,
      currentClient: null,
      clientIndex: null,
      invalid: false
    })
  }

  handleName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleDesc = (event) => {
    this.setState({
      description: event.target.value
    })
  }

  handleWebsite = (event) => {
    this.setState({
      website: event.target.value
    })
  }

  handleUserCount = (event) => {
    this.setState({
      userCount: event.target.value
    })
  }

  handleAdd = () => {
    if (this.state.name != '' && this.state.description != '' & this.state.website != '') {
      const data = {
        "name": this.state.name,
        "description": this.state.description,
        "website": this.state.website,
        'user_count': this.state.userCount,
        'profile_image': '-'
      }

      axios.post(constants["apiUrl"] + '/admin/createClient', data)
        .then((res) => {
          let data = res.data;
          let updatedClients = [...this.state.clients];
          updatedClients.push(data.client);
          this.setState({
            clients: updatedClients,
          })
          this.closeAddModal()
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }
    else {
      this.setState({
        invalid: true
      })
    }
  }

  handleDelete = (client, index) => {
    if (client != null) {
      const data = {
        "clientId": client.id
      }
      let updatedClients = [...this.state.clients];
      updatedClients.splice(index, 1);
      axios.post(constants["apiUrl"] + '/admin/deleteClient', data)
        .then((res) => {
          let data = res.data;
          this.setState({
            clients: updatedClients,
          })
          this.closeAddModal()
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }
  }

  handleEdit = () => {
    if (this.state.currentClient != null) {
      const data = {
        "clientId": this.state.currentClient,
        "name": this.state.name,
        "description": this.state.description,
        "website": this.state.website,
        'user_count': this.state.userCount,
        'profile_image': '-'
      }
      let updatedClients = [...this.state.clients];
      axios.post(constants["apiUrl"] + '/admin/editClient', data)
        .then((res) => {
          let data = res.data;
          updatedClients[this.state.clientIndex] = data.client
          this.setState({
            clients: updatedClients,
          })
          this.closeEditModal()
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }
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
                          <tr key={index}>
                            <th scope="row">
                              {client.name}
                            </th>
                            <td>
                              {client.user_count ? client.user_count : "-"}
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
                                pathname: '/master/view/client/' + client.id,
                              }}>
                                <Button color="primary" size="sm">
                                  View
                                </Button>
                              </Link>
                              <Button style={{marginLeft:10}} color="primary" size="sm" onClick={() => this.openEditModal(client, index)}>
                                Edit
                              </Button>
                              <Button color="danger" size="sm" onClick={() => this.handleDelete(client, index)}>
                                Delete
                                </Button>
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
                  <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.closeAddModal()}>
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
                    <div className="form-group">
                      <label for="recipient-UserCount" class="col-form-label" >User Count</label>
                      <input type="number" defaultValue={5} class="form-control" id="recipient-number" onChange={this.handleUserCount}></input>
                    </div>
                  </form>
                  {this.state.invalid ?
                    <div className="text-center">
                      <text style={{ color: 'red' }}>Invalid Fields</text>
                    </div>
                    :
                    null}
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
              <Modal
                className="modal-dialog-centered"
                isOpen={this.state.editModal}
                defaultValue={this.state.editModal}
                toggle={() => this.closeEditModal()}
              >
                <div className="modal-header">
                  <h2 className="modal-title" id="assignModelLabel">
                    Edit Client
                  </h2>
                  <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.closeEditModal()}>
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.currentClient ?
                    <form>

                      <div className="form-group">
                        <label for="recipient-name" class="col-form-label" >Name:</label>
                        <input type="text" defaultValue={this.state.currentClient.name} class="form-control" id="recipient-name" onChange={this.handleName}></input>
                      </div>
                      <div class="form-group">
                        <label for="message-text" class="col-form-label">Description:</label>
                        <textarea style={{ height: 100 }} class="form-control" defaultValue={this.state.currentClient.description} id="message-text" id="message-text" onChange={this.handleDesc}></textarea>
                      </div>
                      <div className="form-group">
                        <label for="recipient-website" class="col-form-label" >Website</label>
                        <input type="link" class="form-control" defaultValue={this.state.currentClient.website} id="recipient-website" onChange={this.handleWebsite}></input>
                      </div>
                      <div className="form-group">
                        <label for="recipient-UserCount" class="col-form-label" >User Count</label>
                        <input type="number" defaultValue={5} class="form-control" id="recipient-number" onChange={this.handleUserCount}></input>
                      </div>
                    </form>
                    :
                    null
                  }
                </div>
                <div className="modal-footer">
                  <Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.closeEditModal()}>
                    Cancel
                  </Button>
                  <Button color="success" type="button" onClick={() => this.handleEdit()}>
                    Save
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
