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

import Header from "components/User/Headers/EmptyHeader.js";

class Workflows extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        //States
    };
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
                        <tr>
                        <th scope="row">Mark Smith</th>
                        <td>3 Mb</td>
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
                        <tr>
                        <th scope="row">Maria Gracia</th>
                        <td>5.5 Mb</td>
                        <th >James Smith</th>
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
                        <tr>
                        <th scope="row">Lillian Foard</th>
                        <td>5.5 Mb</td>
                        <th >John Doe</th>
                        <td className="text-center">
                            <Button
                            color="success"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                            size="sm"
                            >
                            Accept
                            </Button>
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
                        <tr>
                        <th scope="row">Alfred Ansari</th>
                        <td>3 Mb</td>
                        <th >Loise Behler</th>
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

export default Workflows;
