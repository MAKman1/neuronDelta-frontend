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
    constructor(props) {
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
                                            <h3 className="mb-0">Assigned Workflows</h3>
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
                                        <tr>
                                            <th scope="row">HR Interview Round 1</th>
                                            <td>Lillian Foard</td>
                                            <td>13-6-2021</td>
                                            <td>Human Resource Law</td>
                                            <td>
                                                <i className="fas fa-arrow-up text-success mr-3" />{" "}
                            46,53%
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
                                            <th scope="row">Car Repair</th>
                                            <td>Denver Louis</td>
                                            <td>4-8-2021</td>
                                            <td>Car Verification</td>
                                            <td>
                                                <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                            41,53%
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
                                            <th scope="row">Sanitation 1.1</th>
                                            <td>Maria Gracia</td>
                                            <td>22-5-2021</td>
                                            <td>Fumigation Law</td>
                                            <td>
                                                <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                            43,53%
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
