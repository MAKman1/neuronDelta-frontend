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

class ManagerStandards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // State
    };
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
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
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
                    <tr>
                      <th scope="row">Food Legislation</th>
                      <td>46</td>
                      <td>75</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        46,53%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Fumigation Law</th>
                      <td>23</td>
                      <td>45</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        46,53%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Can Verification</th>
                      <td>19</td>
                      <td>81</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                        36,49%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Restaurant Sanitation</th>
                      <td>56</td>
                      <td>94</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />{" "}
                        50,87%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Income Tax Payment</th>
                      <td>104</td>
                      <td>158</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Income Tax Payment</th>
                      <td>104</td>
                      <td>158</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Income Tax Payment</th>
                      <td>104</td>
                      <td>158</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Income Tax Payment</th>
                      <td>104</td>
                      <td>158</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Income Tax Payment</th>
                      <td>104</td>
                      <td>158</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Income Tax Payment</th>
                      <td>104</td>
                      <td>158</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
                        size="sm"
                      >
                        View
                      </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Income Tax Payment</th>
                      <td>104</td>
                      <td>158</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                        46,53%
                      </td>
                      <td>
                      <Button
                        color="success"
                        href="#pablo"
                        onClick={() => this.toggleModal("documentModel")}
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

export default ManagerStandards;
