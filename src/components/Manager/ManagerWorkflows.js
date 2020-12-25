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
  Col
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";

class ManagerWorkflows extends React.Component {
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
                      <h3 className="mb-0">Workflows</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Add Workflow
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Workflow</th>
                      <th scope="col">Progress</th>
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
                        Product Launch
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        85.65%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Tax Audit 2.1</th>
                      <td>
                        Henry Greysmith
                      </td>
                      <td>12/20/2020</td>
                      <td>
                        Tax Approval
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        65.12%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Car Quality 1.3</th>
                      <td>
                        Martha Stewart
                      </td>
                      <td>12/26/2020</td>
                      <td>
                        Insurance Verification
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46.78%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Vehicle Tax 1.7</th>
                      <td>
                        Saima Malik
                      </td>
                      <td>01/04/2021</td>
                      <td>
                        Recruitment
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        21.82%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Fumigation Law 4.3</th>
                      <td>
                        Sakamato Yui
                      </td>
                      <td>01/10/2021</td>
                      <td>
                        Pre-Flight Approval
                      </td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        10.53%
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

export default ManagerWorkflows;
