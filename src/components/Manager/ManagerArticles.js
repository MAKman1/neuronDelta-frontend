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

class ManagerArticles extends React.Component {
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

    //console.warn('user ' + userId + 'client ' + clientId);

    if (clientId != null && userId != null) {
      const data = {
        "clientId": clientId,
      }
      axios.post(constants["apiUrl"] + '/articles/getAllManager', data)
        .then((res) => {
          let data = res.data;
          //console.warn(JSON.stringify(data));
          this.setState({
            articles: data.articles,
          })
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    } else {
      //TODO: go back to login
    }
  }

  viewArticle = (articleId) => {
    //console.warn("MEW")
    this.props.history.push("/manager/view/"+articleId);
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
                    
                   {this.state.articles.map(article => {
                     {this.state.pathname = '/manager/view/article/' + article.id}
                     return (
                       <tr>
                         <th scope="row">{article.name}</th>
                         <td>Will Cole</td>
                         <td>30/12/2020</td>
                         <td>
                            <div className="d-flex align-items-center">
                              <span className="mr-2">{article.standard.id}</span>
                            </div>
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

export default ManagerArticles;
