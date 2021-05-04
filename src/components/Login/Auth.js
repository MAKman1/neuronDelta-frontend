/*! Developed by Alinon */
import React from "react";
import { Route } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
// reactstrap components

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner
} from "reactstrap";

// core components
import AuthNavbar from "components/Login/AuthNavbar.js";
import AuthFooter from "components/Login/AuthFooter.js";
import { constants } from '../../constants.js';

class Auth extends React.Component {


  constructor(prop) {
    super(prop);
    this.state = {
      valid: 0,
      loggedIn: 1,
      email: "",
      password: "",
    };
  }


  componentDidMount() {
    //Check if auth token in valid
    let userId = reactLocalStorage.get('userId', true);
    let token = reactLocalStorage.get('authToken', true);

    if (token != null && userId != null) {
      const data = {
        "token": "" + token,
        "userId": userId
      }
      axios.post(constants["apiUrl"] + '/login/validate', data)
        .then((res) => {
          let data = res.data;
          if (data.valid == true) {
            this.setState({ loggedIn: 1 });
            let userType = reactLocalStorage.get('userType', true);
            if (userType == 1)
              this.props.history.push("/user/index");
            else
              this.props.history.push("/manager/index");
          } else {
            this.setState({ loggedIn: 0 });
          }

        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
          this.setState({ loggedIn: 0 });
        });
    } else {
      this.setState({ loggedIn: 0 });
    }


    // document.body.classList.add("bg-default");
  }
  componentWillUnmount() {
    document.body.classList.remove("bg-default");
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  }
  handleEmail = (event) => {
    this.setState({ email: event.target.value });
    // console.log(this.state.email);
  }
  handlePass = (event) => {
    this.setState({ password: event.target.value });
    // console.log(this.state.password);
  }

  userlogin = () => {
    //Api call time
    const data = {
      "email": "" + this.state.email,
      "password": "" + this.state.password
    }
    axios.post(constants["apiUrl"] + '/login', data)
      .then((res) => {
        let data = res.data;
        if (data.login == true) {
          reactLocalStorage.setObject('currentUser', data.user);
          reactLocalStorage.set('authToken', data.user.auth_token);
          reactLocalStorage.set('userId', data.user.id);
          reactLocalStorage.set('clientId', data.user.client_id);
          reactLocalStorage.set('userType', data.user.user_type);

          if (data.user.user_type == 1) {
            this.props.history.push("/user/index");
          } else if (data.user.user_type == 2) {
            this.props.history.push("/manager/index");
          } else {
            this.props.history.push("/master/index");
          }
        } else {
          this.setState({ valid: 1 });
        }
      })
      .catch((error) => {
        this.setState({
          valid: 1
        })
        console.warn(JSON.stringify(error));
      });

    // if (this.state.email === "user@gmail.com" && this.state.password === "password") {

    // };
    // if (this.state.email === "manager@gmail.com" && this.state.password === "password") {
    //   this.props.history.push("/manager/index");
    // }
    // this.setState({
    //   valid: 1
    // })

  };
  render() {
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Welcome to Assent360</h1>
                    <p className="text-black text-light">
                      Please login with your account details
                    </p>
                  </Col>

                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    {this.state.loggedIn == 0 ?
                      <Form role="form">
                        <FormGroup className="mb-3">
                          {this.state.valid === 1 && <p style={{ color: 'red', textAlign: 'center' }}>Invalid Credentials! Please try again.</p>}
                          {this.state.valid === 0 && <p style={{ color: 'red', textAlign: 'center' }}></p>}
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type="email" autoComplete="new-email" onChange={this.handleEmail}
                              defaultValue={this.state.email} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Password" type="password" autoComplete="new-password"
                              onChange={this.handlePass} defaultValue={this.state.password} />
                          </InputGroup>
                        </FormGroup>
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span className="text-muted">Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button className="my-4" color="primary" type="button" onClick={this.userlogin}>
                            Sign in
                          </Button>
                        </div>
                      </Form>
                      :
                      <div className="text-center">
                        <Spinner st color="primary" />
                      </div>
                    }
                  </CardBody>
                </Card>
                <Row className="mt-3">
                {this.state.loggedIn == 0 ?
                  <Col xs="6">
                    <a
                      className="text-light"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      <small>Forgot password?</small>
                    </a>
                  </Col>
                  : null }
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Auth;
