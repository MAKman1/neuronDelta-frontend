/*! Developed by Alinon */
import React from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { Link } from "react-router-dom";
import { constants } from '../../../constants.js';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import Header from "components/User/Headers/EmptyHeader.js";

class Workflows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      loading: true
    };
  }

  componentDidMount() {
    //Check if auth token in valid
    let userId = reactLocalStorage.get('userId', true);
    let type = reactLocalStorage.get('userType', true);

    if (type == 1) {
      if (userId != null) {
        const data = {
          "userId": userId
        }
        axios.post(constants["apiUrl"] + '/documents/getAssigned', data)
          .then((res) => {
            let data = res.data;
            console.warn(JSON.stringify(data));
            this.setState({
              documents: data.documents,
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
    else {
      this.props.history.push("/login");
    }
  }

  acceptDocument(index) {
    this.state.documents[index].accepted = true;
    this.forceUpdate();

    let userId = reactLocalStorage.get('userId', true);
    let clientId = reactLocalStorage.get('clientId', true);

    if (clientId != null && userId != null) {
      let data = new FormData();

      console.warn("client ID: " + clientId);

      data.append("clientId", clientId);
      data.append("userId", userId);
      data.append("documentId", this.state.documents[index].id);

      axios.post(constants["apiUrl"] + '/documents/accept', data)
        .then((res) => {
          let data = res.data;
          console.warn(JSON.stringify(data));
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
            <Col xl>
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Assigned Documents</h3>
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
                        <th scope="col">File Size</th>
                        <th scope="col">Assigned By</th>
                        <th className="text-center" scope="col">Accepted</th>
                        <th className="text-center" scope="col">File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.documents.map((doc, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{doc.name}</th>
                            <td>{doc.size} KB</td>
                            <th >{doc.assignedBy}</th>
                            <td className="text-center">
                              {doc.accepted ? <i class="fas fa-check"></i>
                                : <Button color="success" href="#pablo" onClick={() => this.acceptDocument(index)} size="sm"> Accept </Button>
                              }
                            </td>
                            <td className="text-center">
                              <Link to={{
                                pathname: '/user/view/document/' + doc.id
                              }}>
                                <Button
                                  color="primary"
                                  href="#pablo"
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
                }
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Workflows;
