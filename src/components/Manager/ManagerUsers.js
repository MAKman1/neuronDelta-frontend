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
  CardBody,
  Row,
  Modal,
  Table,
  Button,
  Container,
  Spinner
} from "reactstrap";

import Header from "components/Manager/Headers/EmptyHeader.js";

class ManagerUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userModel: false,
      userViewModel: false,
      userEditModal: false,
      users: [],
      user: null,
      userPassword: '',
      userName: '',
      userMail: '',
      loading: true,
      userIndex: null,
      email: '',
      about: ''
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
      axios.post(constants["apiUrl"] + '/user/getAll', data)
        .then((res) => {
          let data = res.data;
          console.warn(JSON.stringify(data));
          this.setState({
            users: data.users,
            loading: false
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

  toggleEditModal = state => {
    this.setState({
      [state]: !this.state[state],
      userName: this.state.user.name,
      email: this.state.user.email,
      about: this.state.user.about,
    });
    console.log(this.state.user)
  };

  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleUserEmail = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  handleUserName = (event) => {
    this.setState({
      userName: event.target.value
    });
  }

  handleAbout = (event) => {
    this.setState({
      about: event.target.value
    });
  }

  handleUserName = (event) => {
    this.setState({ userName: event.target.value });
  }

  makeid = (length) => {
    var result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    //console.warn(result)
    return result;
  }

  handlePassword = (event) => {
    this.setState({ userPassword: this.makeid(10) })
  }

  handleUserEmail = (event) => {
    this.setState({ userMail: event.target.value });
  }

  toggleUserModal = (state, index = null) => {
    this.setState({
      [state]: !this.state[state],
      userIndex: index,
      user: this.state.users[index]
    });
  }

  handleEditProfile = () => {
    let userId = this.state.user.id;

    if (userId != null) {
      let data;
      if (this.state.password === '') {
        data = {
          "about": "" + this.state.about,
          "name": "" + this.state.userName,
          "userId": "" + userId
        }
      }
      else {
        data = {
          "about": "" + this.state.about,
          "name": "" + this.state.userName,
          "password": "" + this.state.password,
          "userId": "" + userId
        }
      }

      axios.post(constants["apiUrl"] + '/user/update', data)
        .then((res) => {
          let data = res.data;
          //console.warn(JSON.stringify(data));
          this.setState({
            userName: '',
            password: '',
            email: '',
            about: '',
          })
          this.forceUpdate();
          this.toggleEditModal("userEditModal");
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }
  }

  handleAddUser = () => {
    //console.warn('new');
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
          //console.warn(JSON.stringify(data));
          this.setState({
            userName: '',
            userPassword: '',
            userMail: '',

          })
          this.toggleModal("userModel");
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }
  }

  deleteUser = (index) => {
		let userId = this.state.users[index].id;

		if (userId != null) {
			let data = {
				"userId": userId
			}

			axios.post(constants["apiUrl"] + '/user/delete', data)
				.then((res) => {
					let data = res.data;
					//console.warn(JSON.stringify(data));
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
                                  <text class="px-3">   {this.state.userPassword} </text>

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
                        <th scope="col">Role</th>
                        <th scope="col">Assigned Workflow</th>
                        <th scope="col">Assigned Article</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.map((user, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{user.name}</th>
                            <td>
                              <h4><span className="badge badge-primary">Engineer</span></h4>
                            </td>
                            <td>{user.assignedWorkflows}</td>
                            <td>{user.assignedArticles}</td>
                            <td>
                              <Button color="primary" size="sm" onClick={() => this.toggleUserModal('userViewModel', index)}>
                                View
                              </Button>
                            </td>
                            <td>
                              <Button color="warning" onClick={() => this.deleteUser(index)} size="sm">
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
                isOpen={this.state.userViewModel}
                toggle={() => this.toggleUserModal("userViewModel")}
              >
                <div className="modal-header-centered">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      {/* {this.state.user.profile_image === null ? */}
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/default/defaultProfile.png")}
                      />
                      {/* :
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/default/defaultProfile.jpg")}
                          />
                        } */}
                    </a>
                  </div>
                  <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.toggleUserModal("userViewModel")}>
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="text-center" style={{ paddingTop: 100 }}>
                    <h1>
                      {this.state.userIndex != null ? this.state.users[this.state.userIndex].name : null}
                    </h1>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.userIndex != null ? this.state.users[this.state.userIndex].email : null}
                    </div>
                    <div className="h5 mt-5">
                      <i className="ni business_briefcase-24 mr-2"></i>
                      {this.state.userIndex != null ? this.state.users[this.state.userIndex].about : null}
                    </div>
                    <div className="">
                      <i className="ni business_briefcase-24 mr-2" />
                      <span class="badge badge-primary">Manager</span>

                      <span class="badge badge-primary">Doctor</span>

                      <span class="badge badge-primary">HealthExpert</span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button color="primary" data-dismiss="modal" type="button" onClick={() => this.toggleEditModal("userEditModal")}>
                    Edit
                  </Button>
                  <Button color="warning" data-dismiss="modal" type="button" onClick={() => this.toggleUserModal("userViewModel")}>
                    Close
                  </Button>
                </div>
              </Modal>
              <Modal
                className="modal-dialog-centered"
                isOpen={this.state.userEditModal}
                toggle={() => this.toggleEditModal("userEditModal")}
              >
                <div className="modal-header">
                  <h2 className="modal-title" id="userModalLabel">
                    Edit Profile
                         				</h2>
                  <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.toggleEditModal("userEditModal")} >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.state.user != null ?
                    <form>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label" >Name:</label>
                        <input type="text" class="form-control" id="recipient-name" defaultValue={this.state.user.name} onChange={this.handleUserName}></input>
                      </div>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label" >Email:</label>
                        <input type="text" class="form-control" id="recipient-name" defaultValue={this.state.user.email} onChange={this.handleUserEmail}></input>
                      </div>
                      <div class="form-group">
                        <label for="message-text" class="col-form-label">About:</label>
                        <textarea class="form-control" id="message-text" defaultValue={this.state.user.about} onChange={this.handleAbout}></textarea>
                      </div>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label" >Password:</label>
                        <input type="text" class="form-control" id="recipient-name" defaultValue={this.state.user.password} onChange={this.handlePassword}></input>
                      </div>
                    </form>
                    : null
                  }
                </div>
                <div className="modal-footer">
                  <Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.toggleEditModal("userEditModal")}>
                    Cancel
                  </Button>
                  <Button color="success" type="button" onClick={this.handleEditProfile}>
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

export default ManagerUsers;
