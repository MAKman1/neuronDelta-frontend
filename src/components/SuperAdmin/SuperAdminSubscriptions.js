/*! Developed by Alinon */
import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';

// reactstrap components
import {
    Col,
    Card,
    CardHeader,
    CardBody,
    Row,
    Modal,
    Table,
    Button,
    Container,
    Spinner,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from "reactstrap";

import Header from "components/Manager/Headers/EmptyHeader.js";

class SuperAdminSubscriptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleClient: false,
            toggleStandard: false,
            loading: true,
            addModal: false,
            subscriptions: [],
            clients: [],
            standards: [],
            description: "-",
            currentStandard: null,
            currentClient: null,
        };
    }

    componentDidMount() {
        axios.post(constants["apiUrl"] + '/admin/getSubscriptions')
            .then((res) => {
                let data = res.data;
                this.setState({
                    subscriptions: data.subscriptions,
                    loading: false
                })
            })
            .catch((error) => {
                console.warn(JSON.stringify(error));
            });

        axios.post(constants["apiUrl"] + '/admin/getClients')
            .then((res) => {
                let data = res.data;
                this.setState({
                    clients: data.clients,
                    loading: false
                })
            })
            .catch((error) => {
                console.warn(JSON.stringify(error));
            });

        axios.post(constants["apiUrl"] + '/admin/getStandards')
            .then((res) => {
                let data = res.data;
                console.log(data);
                this.setState({
                    standards: data.standards,
                    loading: false
                })
            })
            .catch((error) => {
                console.warn(JSON.stringify(error));
            });
    }

    toggleDropdown = (state) => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    openAddModal = () => {
        this.setState({
            addModal: true,
        })
    }

    closeAddModal = () => {
        this.setState({
            addModal: false,
            currentClient: null,
            currentStandard: null,
            description: '-'
        })
    }

    handleDesc = (event) => {
        this.setState({ description: event.target.value });
    }

    selectStandard = (standard) => {
        this.setState({
            currentStandard: standard
        })
    }

    selectClient = (client) => {
        this.setState({
            currentClient: client
        })
    }

    handleDeleteSub = (subscription, index) => {
        let subscriptionId = subscription.id;
        console.log(subscriptionId)
        if (subscriptionId != null) {
            const data = {
                'subscriptionId': '' + subscriptionId
            }
            
            let updatedSubscriptions = [...this.state.subscriptions];
            updatedSubscriptions.splice(index, 1); 

            axios.post(constants["apiUrl"] + '/admin/deleteSubcription', data)
                .then((res) => {
                    let data = res.data;
                    this.setState({
                        subscriptions: updatedSubscriptions
                    })
                })
                .catch((error) => {
                    console.warn(JSON.stringify(error));
                });
        }
    }

    handleAdd = () => {
        if (this.state.currentStandard != null && this.state.currentClient != null) {
            let standardId = this.state.currentStandard.id;
            let clientId = this.state.currentClient.id;

            const data = {
                "clientId": clientId,
                "standardId": standardId,
                "notes": this.state.description
            }
            axios.post(constants["apiUrl"] + '/admin/addSubscription', data)
                .then((res) => {
                    let data = res.data;
                    data.sub.client = this.state.currentClient;
                    data.sub.standard = this.state.currentStandard;
                    let updatedSubscriptions = [...this.state.subscriptions];
                    updatedSubscriptions.push(data.sub);
                    console.log(data);
                    this.setState({
                        subscriptions: updatedSubscriptions
                    })
                    this.forceUpdate();
                    this.closeAddModal();
                })
                .catch((error) => {
                    console.warn(JSON.stringify(error));
                });
        }
    }





    render() {
        return (
            <>
                <Header />
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
                                        <div className="col text-right">
                                            <Button color="success" onClick={() => this.openAddModal()} size="md">
                                                Add Subscription
                                            </Button>
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
                                                <th scope="col">Standard</th>
                                                <th scope="col">Client</th>
                                                <th scope="col">Details</th>
                                                <th scope="col"></th>
                                                {/* <th scope="col">Assigned Article</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.subscriptions.map((sub, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            {sub.standard.name}
                                                        </th>
                                                        <td>
                                                            {sub.client.name}
                                                        </td>
                                                        <td style={{ maxWidth: 150 }}>
                                                            <text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                                                {sub.notes ? sub.notes : '-'}
                                                            </text>
                                                        </td>
                                                        {/* <td>
                                                            <Link to={{
                                                                pathname: '/superadmin/view/client/' + 2,
                                                            }}>
                                                                <Button color="primary" size="sm">
                                                                    View
                                                        </Button>
                                                            </Link>
                                                        </td> */}
                                                        <td>
                                                            <Button color="warning" onClick={() => this.handleDeleteSub(sub, index)} size="sm">
                                                                Delete
                                                            </Button>
                                                        </td>

                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                }
                            </Card>
                            <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.addModal}
                                defaultValue={this.state.addModal}
                                toggle={() => this.closeAddModal()}
                            >
                                <div className="modal-header">
                                    <h2 className="modal-title" id="assignModelLabel">
                                        Add New Subscription
                                            </h2>
                                    <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => this.closeAddModal()}>
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <Row className="justify-content-md-center">
                                        <Col xl="auto">
                                            <Dropdown isOpen={this.state.toggleStandard} toggle={() => this.toggleDropdown("toggleStandard")}>
                                                <DropdownToggle caret>
                                                    {this.state.currentStandard == null ? <>Select Standard</> : this.state.currentStandard.name}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {this.state.standards.map((standard, index) => {
                                                        return (
                                                            <DropdownItem key={index} onClick={() => this.selectStandard(standard)}>{standard.name}</DropdownItem>
                                                        )
                                                    })}
                                                    {/* {this.state.roles.map((role, index) => {
																	if (this.state.tempRoles.some(r => r.id === role.id)) {
																		return (
																			<DropdownItem disabled key={index} onClick={() => this.selectRole(role)}>{role.name}</DropdownItem>
																		)
																	}
																	else {
																		return (
																			<DropdownItem key={index} onClick={() => this.selectRole(role)}>{role.name}</DropdownItem>
																		)
																	}
																})} */}
                                                </DropdownMenu>
                                            </Dropdown>
                                        </Col>
                                        <Col xl="auto">
                                            <Dropdown isOpen={this.state.toggleClient} toggle={() => this.toggleDropdown("toggleClient")}>
                                                <DropdownToggle caret>
                                                    {/* Select */}
                                                    {this.state.currentClient == null ? <>Select Client</> : this.state.currentClient.name}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    {this.state.clients.map((client, index) => {
                                                        return (
                                                            <DropdownItem key={index} onClick={() => this.selectClient(client)}>{client.name}</DropdownItem>
                                                        )
                                                    })}
                                                    {/* {this.state.roles.map((role, index) => {
																	if (this.state.tempRoles.some(r => r.id === role.id)) {
																		return (
																			<DropdownItem disabled key={index} onClick={() => this.selectRole(role)}>{role.name}</DropdownItem>
																		)
																	}
																	else {
																		return (
																			<DropdownItem key={index} onClick={() => this.selectRole(role)}>{role.name}</DropdownItem>
																		)
																	}
																})} */}
                                                </DropdownMenu>
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                    <Row style={{ paddingTop: '25px' }} className="justify-content-md-center">
                                        <Col xl>
                                            <form>
                                                <div class="form-group">
                                                    <label for="recipient-name" class="col-form-label">Notes:</label>
                                                    <input type="text" class="form-control" id="recipient-name" onChange={this.handleDesc}></input>
                                                </div>
                                            </form>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="modal-footer">
                                    <Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.closeAddModal()}>
                                        Cancel
                                    </Button>
                                    <Button color="success" type="button" onClick={() => this.handleAdd()}>
                                        Add
                                    </Button>
                                </div>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default SuperAdminSubscriptions;
