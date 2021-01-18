/*! Developed by Alinon */
import React from "react";
import axios from 'axios';
import { constants } from '../../../constants';
import { reactLocalStorage } from 'reactjs-localstorage';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Button,
  Modal
} from "reactstrap";
// core components
import UserHeader from "../Headers/EmptyHeader";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userModal: false,
      username: '',
      password: '',
      email: '',
      about: '',
    }
  }

  componentDidMount() {
    let userId = reactLocalStorage.get('userId', true);

    if (userId != null) {
      const data = {
        "userId": userId
      }
      axios.post(constants["apiUrl"] + '/user/getUser', data)
        .then((res) => {
          let data = res.data;
          console.warn(JSON.stringify(data));
          this.setState({
            // loading: false
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
    this.setState({
      [state]: !this.state[state],
      username: this.state.user.name,
      email: this.state.user.email,
      about: this.state.user.about,
    });
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
      username: event.target.value
    });
  }

  handleAbout = (event) => {
    this.setState({
      about: event.target.value
    });
  }

  async updateUser() {
    let user = await reactLocalStorage.getObject('currentUser', true);
    console.log(user);
    if (user != null) {
      this.setState({
        user: user,
      });
    }
  }

  handleEditProfile = () => {
    let userId = reactLocalStorage.get('userId', true);
    let clientId = reactLocalStorage.get('clientId', true);

    if (clientId != null && userId != null) {
      let data;
      if (this.state.password === '') {
        data = {
          "about": "" + this.state.about,
          "name": "" + this.state.username,
          "userId": "" + userId
        }
      }
      else {
        data = {
          "about": "" + this.state.about,
          "name": "" + this.state.username,
          "password": "" + this.state.password,
          "userId": "" + userId
        }
      }

      axios.post(constants["apiUrl"] + '/user/update', data)
        .then((res) => {
          let data = res.data;
          this.setState({
            username: '',
            password: '',
            email: '',
            about: '',
          })
          this.toggleModal("userModal");
          this.updateUser();
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }
  }

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="5">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        {this.state.user.profile_image === null ?
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/default/defaultProfile.png")}
                          />
                          :
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/default/defaultProfile.jpg")}
                          />
                        }
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>
                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>
                        <div>
                          <span className="heading"></span>
                          <span className="description"></span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h1>
                      {this.state.user.name}
                    </h1>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {this.state.user.email}
                    </div>
                    <div className="h5 mt-5">
                      <i className="ni business_briefcase-24 mr-2"></i>
                      {this.state.user.about}
                    </div>
                    <div className="">
                      <i className="ni business_briefcase-24 mr-2" />
                      <span class="badge badge-primary">Manager</span>

                      <span class="badge badge-primary">Doctor</span>

                      <span class="badge badge-primary">HealthExpert</span>
                    </div>
                    <hr className="my-4" />
                    <Button color="primary" onClick={() => this.toggleModal("userModal")} size="m" >
                      Edit Profile
                    </Button>
                  </div>
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.userModal}
                    toggle={() => this.toggleModal("userModal")}
                  >
                    <div className="modal-header">
                      <h2 className="modal-title" id="userModalLabel">
                        Edit Profile
                          </h2>
                      <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.toggleModal("userModal")} >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
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
                          <input type="password" placeholder="Enter New Password" class="form-control" id="recipient-name" onChange={this.handlePassword}></input>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.toggleModal("userModal")}>
                        Cancel
                      </Button>
                      <Button color="success" type="button" onClick={this.handleEditProfile}>
                        Save
                      </Button>
                    </div>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Profile;
