/*! Developed by Alinon */
import React from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../../constants';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Col,
    CardBody,
    Spinner
} from "reactstrap";

import Header from "components/User/Headers/EmptyHeader.js";

class Workflows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workflows: [],
            loading: true
        };
    }

    componentDidMount() {
        //Check if auth token in valid
        let userId = reactLocalStorage.get('userId', true);
        let clientId = reactLocalStorage.get('clientId', true);

        if (clientId != null) {
            const data = {
                "clientId": clientId,
                "userId": userId
            }
            axios.post(constants["apiUrl"] + '/workflows/getAssignedWorkflows', data)
                .then((res) => {
                    let data = res.data;
                    console.warn(JSON.stringify(data));
                    this.setState({
                        workflows: data.workflows,
                        loading: false
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
                                            <h3 className="mb-0">Assigned Workflows</h3>
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
                                                <th scope="col">Assigned By</th>
                                                <th scope="col">Due By</th>
                                                <th scope="col">Progress</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.workflows.map((w, index) => {
                                                const date = new Date(w.updated_at).toLocaleString();
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{w.name}</th>
                                                        { w.user != null ? <td>{w.user.name}</td>
                                                            : <td>-</td>
                                                        }
                                                        <td>-</td>
                                                        <td>
                                                            <i className="fas fa-arrow-up text-success mr-3" />{" "}
                                                             {w.progress != null ? w.progress + "%" : "-" }
                                                            </td>
                                                        <td className="text-center">
                                                            <Button color="primary" href="#pablo" onClick={e => e.preventDefault()} size="sm" >
                                                                View
                                                            </Button>
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
