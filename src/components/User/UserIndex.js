/*! Developed by Alinon */
import React from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';
import { Link } from "react-router-dom";


import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import Header from "components/User/Headers/DashboardHeader.js";

class UserIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendArticles: 0,
      compArticles: 0,
      assignedDocs: 0,
      articles: [],
      documents: [],
      assignedWorkflows: []
    };
  }

  componentDidMount() {
    //Check if auth token in valid
    let userId = reactLocalStorage.get('userId', true);
    let clientId = reactLocalStorage.get('clientId', true);

    //onsole.warn('user ' + userId + 'client ' + clientId);

    if (clientId != null && userId != null) {
      const data = {
        "clientId": clientId,
        "userId": userId
      }
      axios.post(constants["apiUrl"] + '/dashboard/get', data)
        .then((res) => {
          let data = res.data;
          //console.warn(JSON.stringify(data));
          this.setState({
            pendArticles: data.pendingArticles,
            compArticles: data.completedArticles,
            assignedDocs: data.assignedDocuments,
            articles: data.assignedArticles,
            documents: data.documents,
            assignedWorkflows: data.assignedWorkflows
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
        <Header
          pendArticles={this.state.pendArticles}
          compArticles={this.state.compArticles}
          assignedDocs={this.state.assignedDocs}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="7">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Assigned Articles</h3>
                    </div>
                    <div className="col text-right">
                      <Link to={{
                        pathname: '/user/audit',
                      }} style={{ paddingRight: 5 }}>
                        <Button
                          color="primary"
                          size="sm"
                        >
                          See All
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Assigned By</th>
                      <th scope="col">Due By</th>
                      <th scope="col">Standard</th>
                      <th scope="col">Progress</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.articles.map(a => {
                      {this.state.pathname = '/manager/view/article/' + a.id}
                      return (
                        <tr>
                          <th scope="row">{a.name}</th>
                          <td>{a.assignedBy.name}</td>
                          <td>12-2-2020</td>
                          <td>{a.standard.name}</td>
                          <td>
                            <i className="fas fa-arrow-up text-success mr-3" />{" "}
                            {a.progress} %
                      </td>
                          <td className="text-center">
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
            <Col xl="5">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Assigned Documents</h3>
                    </div>
                    <div className="col text-right">
                    <Link to={{
                        pathname: '/user/docs',
                      }} style={{ paddingRight: 5 }}>
                        <Button
                          color="primary"
                          size="sm"
                        >
                          See All
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </CardHeader>
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
                    {this.state.documents.map(doc => {
                      return (
                        <tr>
                          <th scope="row">{doc.name}</th>
                          <td>{doc.size} KB</td>
                          <th >Denver Louis</th>
                          <td className="text-center"><i class="fas fa-check"></i></td>
                          <td className="text-center">
                            <Button
                              color="primary"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                              size="sm"
                            >
                              View
                        </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col xl>
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Assigned Workflows</h3>
                    </div>
                    <div className="col text-right">
                      <Link to={{
                        pathname: '/user/workflow',
                      }} style={{ paddingRight: 5 }}>
                        <Button
                          color="primary"
                          size="sm"
                        >
                          See All
                        </Button>
                      </Link>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Assigned By</th>
                      <th scope="col">Due By</th>
                      <th scope="col">Standard</th>
                      <th scope="col">Progress</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.assignedWorkflows.map(w => {
                      return (
                        <tr>
                          <th scope="row">{w.name}</th>
                          <td>{w.assignedBy.name}</td>
                          <td>13-6-2021</td>
                          <td>{w.standard.name}</td>
                          <td>
                            <i className="fas fa-arrow-up text-success mr-3" />{" "}
                            {w.progress} %
                      </td>
                          <td className="text-center">
                            <Button
                              color="primary"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                              size="sm"
                            >
                              View
                        </Button>
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

export default UserIndex;
