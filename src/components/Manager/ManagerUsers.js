/*! Developed by Alinon */
import React from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';

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
      users: [],
      userPassword: '',
      userName: '',
      userMail: '',
    };
  }

  componentDidMount() {
    //Check if auth token in valid
    let userId = reactLocalStorage.get('userId', true);
    let clientId = reactLocalStorage.get('clientId', true);

    console.warn('user ' + userId + 'client ' + clientId);

    if (clientId != null && userId != null) {
      const data = {
        "clientId": clientId,
        "userId": userId
      }
      axios.post(constants["apiUrl"] + '/user/get', data)
        .then((res) => {
          let data = res.data;
          console.warn(JSON.stringify(data));
          this.setState({
            users: data.users,
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

  handleUserName = (event) => {
    this.setState({ userName: event.target.value });
    console.warn(this.state.userName);
  }

  makeid = (length) => {
    var result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.warn(result)
    return result;
  }

  handlePassword = (event) => {
    this.setState({ userPassword: this.makeid(10) })
  }

  handleUserEmail = (event) => {
    this.setState({ userMail: event.target.value });
    
  }

  handleAddUser = () => {
    console.warn('new');
    let userId = reactLocalStorage.get('userId', true);
    let clientId = reactLocalStorage.get('clientId', true);

    if (clientId != null && userId != null) {


      const data = {
        "email": "" + this.state.userMail,
        "name": "" + this.state.userName,
        "password": "" + this.state.userPassword,
        "clientId": "" + clientId
      }

      axios.post(constants["apiUrl"] + '/user/create', data)
        .then((res) => {
          let data = res.data;
          console.warn(JSON.stringify(data));
          this.setState({
            userName: '',
            userPassword: '',
            userMail: '',
      
          })
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }

    
    return;

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
                      <h3 className="mb-0">Users</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="success"
                        onClick={() => this.toggleModal("userModel")}
                        size="md"
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
                              <label for="recipient-name" defaultValue={this.state.userName} class="col-form-label" >Name:</label>
                              <input type="text" class="form-control" id="recipient-name" onChange={this.handleUserName}></input>
                            </div>
                            <div class="form-group">
                              <label for="recipient-name" defaultValue={this.state.userMail} class="col-form-label" >Email:</label>
                              <input type="text" class="form-control" id="recipient-name" onChange={this.handleUserEmail}></input>
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
                                  <Button color="primary" type="button" onClick={this.handlePassword}>
                                    Auto Generate
                                </Button>
                                  <p>{this.state.userPassword}</p>
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
                          <Button color="success" type="button" onClick={this.handleAddUser}>
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
                      <th scope="col">Assigned Article</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map(user => {
                      return (
                        <tr>
                          <th scope="row">{user.name}</th>
                          <td>
                            <h4><span className="badge badge-primary">Engineer</span></h4>
                          </td>
                          <td>1</td>
                          <td>2</td>
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

export default ManagerUsers;
