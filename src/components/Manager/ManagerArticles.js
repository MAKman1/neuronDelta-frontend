/*! Developed by Alinon */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {Link} from "react-router-dom";

import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';
import routes from "routes.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";
// import User from "components/User/User";
// import Roles from "./Popups/Roles.js"

class ManagerAudits extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      documentModel: false,
      roleModel: false,
      toggleDropdown: false,
      name: "None",
      articles: []
      
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
      }
      axios.post(constants["apiUrl"] + '/articles/getAll', data)
        .then((res) => {
          let data = res.data;
          console.warn(JSON.stringify(data));
          this.setState({
            articles: data.article,
          })
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    } else {
      //TODO: go back to login
    }
  }



  getRoutes = routes => {
    return routes.map((prop, key) => {
      
      if (prop.layout === "/manager/audit") {
        return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
      } 
      else {
        return null;
      }

    });
  };

  handleClick = () => {
    this.props.history.push('/manager/audit/article');
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
        <EmptyHeader />

        {/* Page content */}
        <Container className="mt--7" fluid>
          
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Articles</h3>
                      
                    </div>

                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Standards</th>
                      <th scope="col">Progress</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    <tr>
                      <th scope="row">Food Quality 1.3</th>
                      <td>
                        Will Cole
                      </td>
                      <td>12/07/2020</td>
                      <td>
                        Food Legislation
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        85.65%
                      </td>
                      <td>
   
                        <Button
                          color="success"
                          size="sm"
                          onClick={this.handleClick}
                        >
                        View
                        </Button>
                      
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Tax Audit 2.1</th>
                      <td>
                        Henry Greysmith
                      </td>
                      <td>12/20/2020</td>
                      <td>
                        Income Tax Audit
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        65.12%
                      </td>
                      <td>
                      <Link to = {{
                            pathname: '/manager/audit/article',
                            state: {
                              name: "Tax Audit 2.1"
                            }
                          }}>
                        <Button
                          color="success"
                          size="sm"
                        >
                        View
                        </Button>
                      </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Car Quality 1.3</th>
                      <td>
                        Martha Stewart
                      </td>
                      <td>12/26/2020</td>
                      <td>
                        Car Registration
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46.78%
                      </td>
                      <td>
                      <Link to = {{
                            pathname: '/manager/audit/article',
                            state: {
                              name: "Car Quality 1.3"
                            }
                          }}>
                        <Button
                          color="success"
                          size="sm"
                        >
                        View
                        </Button>
                      </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Vehicle Tax 1.7</th>
                      <td>
                        Saima Malik
                      </td>
                      <td>01/04/2021</td>
                      <td>
                        Car Registration
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        21.82%
                      </td>
                      <td>
                      <Link to = {{
                            pathname: '/manager/article',
                            state: {
                              name: "Vehicle Tax 1.7"
                            }
                          }}>
                        <Button
                          color="success"
                          size="sm"
                        >
                        View
                        </Button>
                      </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Fumigation Law 4.3</th>
                      <td>
                        Sakamato Yui
                      </td>
                      <td>01/10/2021</td>
                      <td>
                        Fumigation Quality
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        10.53%
                      </td>
                      <td>
                      <Link to = {{
                            pathname: '/manager/article',
                            state: {
                              name: "Fumigation Law 4.3"
                            }
                          }}>
                        <Button
                          color="success"
                          size="sm"
                        >
                        View
                        </Button>
                      </Link>
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

export default ManagerAudits;
