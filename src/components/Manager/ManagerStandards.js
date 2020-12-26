/*! Developed by Alinon */
import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';

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

class ManagerStandards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      standards: []
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
      axios.post(constants["apiUrl"] + '/standards/getAll', data)
        .then((res) => {
          let data = res.data;
          //console.warn(JSON.stringify(data));
          this.setState({
            standards: data.standards,
          })
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    } else {
      //TODO: go back to login
    }
  }

  render() {
    return (
      <>
        <EmptyHeader/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className = "mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Current Standards</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Article Count</th>
                      <th scope="col">Details</th>
                      <th scope="col">Progress</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.standards.map(standard => {
                      this.state.pathname = '/manager/view/standard/' + standard.id
                      return(
                        <tr>
                          <th scope="row">
                            {standard.name}
                          </th>
                          <td>
                            76
                          </td>
                          <td style={{ maxWidth: 150 }}>
                            <text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                              {standard.description}
                            </text>
                          </td>
                          <td>
                            <i className="fas fa-arrow-up text-success mr-3" />{" "}
                            90%
                          </td>
                          <td>
                          <Link to={{
                                    pathname: this.state.pathname,
                                    state: {
                                      name: "Food Quality 1.3"
                                    }
                                  }}>
                                <Button
                                  color="primary"
                                  size="sm"
                                >
                                  View
                                </Button>
                              </Link>
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

export default ManagerStandards;
