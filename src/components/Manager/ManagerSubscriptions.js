/*! Developed by Alinon */
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Modal,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";

class ManagerSubscriptions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // States
    };
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
                    <tr>
                      <th scope="row">Food Legislation</th>
                      <td>
                        12/07/2020
                      </td>
                      <td>Food Quality 1.3</td>
                      <td>
                      <Button
                          color="success"
                          size="sm"
                        >
                        View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Health Guidelines</th>
                      <td>
                        12/07/2020
                      </td>
                      <td>Customer Safety 1.4</td>
                      <td>
                      <Button
                          color="success"
                          size="sm"
                        >
                        View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Kitchen Standard</th>
                      <td>
                        12/07/2020
                      </td>
                      <td>Food Quality 1.3</td>
                      <td>
                      <Button
                          color="success"
                          size="sm"
                        >
                        View
                        </Button>
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

export default ManagerSubscriptions;
