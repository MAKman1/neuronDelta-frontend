/*! Developed by Alinon */
import React from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../../constants.js';

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

class SuperAdminViewClient extends React.Component {

  clientId = this.props.match.params.clientId;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      invalid: false,
      addModal: false,
      managers: [],
      name: "",
      website: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {

    let type = reactLocalStorage.get('userType', true);

    if (type == 3) {
      const data = {
        "clientId": this.clientId,
      }
      axios.post(constants["apiUrl"] + '/admin/getManagers', data)
        .then((res) => {
          let data = res.data;
          this.setState({
            managers: data.managers,
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

  closeAddModal = () => {
    this.setState({
      addModal: false,
      name: '',
      email: '',
      password: '',
      website: ''
    })
  }

  handleName = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }


  handleEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleWebsite = (event) => {
    this.setState({
      website: event.target.value
    })
  }

  handleAdd = () => {
    if (this.state.name != '' && this.state.email != '' & this.state.website != '' & this.state.password != '') {
      const data = {
        "name": this.state.name,
        "email": this.state.email,
        "website": this.state.website,
        'password': this.state.password,
        'clientId': this.clientId
      }

      axios.post(constants["apiUrl"] + '/admin/createManager', data)
        .then((res) => {
          let data = res.data;
          console.log(data);
          let updatedManagers = [...this.state.managers];
          updatedManagers.push(data.manager);
          this.setState({
            managers: updatedManagers,
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

  handleDelete = (manager, index) => {
    if (manager != null) {
      const data = {
        "managerId": manager.id
      }
      let updatedManagers = [...this.state.managers];
      updatedManagers.splice(index, 1);
      axios.post(constants["apiUrl"] + '/admin/deleteManager', data)
        .then((res) => {
          let data = res.data;
          this.setState({
            managers: updatedManagers,
          })
          this.closeAddModal()
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
                      <h3 className="mb-0">Managers</h3>
                    </div>
                    <div className="col text-right">
                      <Button color="success" onClick={() => this.openAddModal()} size="md">
                        Add Manager
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
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.managers.map((manager, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">
                              {manager.name}
                            </th>
                            <td>
                              {manager.email}
                            </td>
                            <td>
                              <Button color="danger" size="sm" onClick={() => this.handleDelete(manager, index)}>
                                Delete
                              </Button>
                            </td>
                          </tr>
                        )
                      })
                      }
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
                    Add New Manager
                      </h2>
                  <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.closeAddModal()}>
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label for="recipient-name" class="col-form-label" >Name:</label>
                      <input type="text" class="form-control" id="recipient-name" onChange={this.handleName}></input>
                    </div>
                    <div className="form-group">
                      <label for="recipient-name" class="col-form-label" >Email:</label>
                      <input type="email" class="form-control" id="recipient-name" onChange={this.handleEmail}></input>
                    </div>
                    <div className="form-group">
                      <label for="recipient-website" class="col-form-label" >Website</label>
                      <input type="link" class="form-control" id="recipient-website" onChange={this.handleWebsite}></input>
                    </div>
                    <div class="form-group">
                      <label for="recipient-name" class="col-form-label" >Password:</label>
                      <input type="password" placeholder="Enter New Password" class="form-control" id="recipient-name" onChange={this.handlePassword}></input>
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
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SuperAdminViewClient;
