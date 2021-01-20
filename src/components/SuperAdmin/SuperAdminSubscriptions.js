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
            toggleDropdown: false,
            loading: false,
            addModal: false,
            name: "",
            website: "",
            description: "",
        };
    }

    componentDidMount() {
        axios.post(constants["apiUrl"] + '/admin/getSubscriptions', {})
            .then((res) => {
                let data = res.data;
                console.log(data);
                // this.setState({

                // })
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
        })
    }

    handleName = () => {

    }

    handleDesc = () => {

    }

    handleWebsite = () => {

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
                                                <th scope="col">Name</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Assigned Workflow</th>
                                                <th scope="col">Assigned Article</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">

                                                </th>
                                                <td>
                                                    <Link to={{
                                                        pathname: '/superadmin/view/client/' + 2,
                                                    }}>
                                                        <Button color="primary" size="sm">
                                                            View
                                                        </Button>
                                                    </Link>
                                                </td>

                                            </tr>
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
                                            <Dropdown isOpen={this.state.toggleDropdown} toggle={() => this.toggleDropdown("toggleDropdown")}>
                                                <DropdownToggle caret>
                                                    Select
                                                    {/* {this.state.currentRole == null ? <>Select Role</> : this.state.currentRole.name} */}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>1</DropdownItem>
                                                    <DropdownItem>2</DropdownItem>
                                                    <DropdownItem>3</DropdownItem>
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
