/*! Developed by Alinon */
import React from "react";


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

class ManagerSubscriptions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      subscriptions: []
    };
  }

  componentDidMount() {
    //Check if auth token in valid
    let userId = reactLocalStorage.get('userId', true);
    let clientId = reactLocalStorage.get('clientId', true);

    //console.warn('user ' + userId + 'client ' + clientId);

    if (clientId != null && userId != null) {
      const data = {
        "clientId": clientId
      }
      axios.post(constants["apiUrl"] + '/subscriptions/get', data)
        .then((res) => {
          let data = res.data;
          console.warn(JSON.stringify(data));
          this.setState({
            subscriptions: data.subscriptions,
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
        <EmptyHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
        <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Subscriptions</h3>
                    </div>

                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Subscribed On</th>
                      <th scope="col">Version</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.subscriptions.map(subs => {
                        return(
                          <tr scope="row">
                            <th>{subs.standard.name}</th>
                            <td>{subs.notes}</td>
                            <td>{subs.standard.version}</td>
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

export default ManagerSubscriptions;
