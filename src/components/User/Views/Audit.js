/*! Developed by Alinon */
import React from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../../constants.js';
import { Link } from "react-router-dom";


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

import Header from "components/User/Headers/EmptyHeader.js";

class Audits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //States
      articles: []
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
      axios.post(constants["apiUrl"] + '/articles/getAssigned', data)
        .then((res) => {
          let data = res.data;
          console.warn(JSON.stringify(data));
          this.setState({
            articles: data.articles
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
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col xl>
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Assigned Articles</h3>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">CheckList Count</th>
                      <th scope="col">Assigned By</th>
                      <th scope="col">Due By</th>
                      <th scope="col">Standard</th>
                      <th scope="col">Progress</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.articles.map(article => {
                      {this.state.pathname = '/user/view/article/' + article.id}
                      return(
                        <tr>
                          <th scope="row">{article.name}</th>
                          <td>Checklist Count</td> 
                          <td>{article.assignedBy.name}</td> 
                          <td>31/12/2020</td>
                          <td>{article.standard.name}</td>
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

export default Audits;
