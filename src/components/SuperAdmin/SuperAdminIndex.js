/*! Developed by Alinon */
import React from "react";
import { Link } from "react-router-dom";
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
	Modal,
	Col,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Spinner
} from "reactstrap";

import DashboardHeader from "components/SuperAdmin/Headers/DashboardHeader.js";
import CardBody from "reactstrap/lib/CardBody";
import { createPrinter } from "typescript";
// import Roles from "./Popups/Roles.js"

class SuperAdminIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			documentModel: false,
			roleModel: false,
			userModal: false,
			userEditModal: false,
			toggleDropdown: false,
			totalUsers: 0,
			pendAudits: 0,
			compAudits: 0,
			subsStandards: 0,
			standards: [],
			documents: [],
			articles: [],
			workflows: [],
			roles: [],
			tempRoles: [],
			removedRoles: [],
			users: [],
			user: null,
			documentName: '',
			documentDesc: '',
			documentIndex: null,
			userIndex: null,
			uploadDocument: null,
			currentRole: null,
			loading: false,
			about: '',
			name: '',
			password: '',
			email: ''
		};
	}

	componentDidMount() {
		//Check if auth token in valid
		
	}

	

	render() {
		return (
			<>
				<DashboardHeader
					totalUsers={this.state.totalUsers}
					compAudits={this.state.compAudits}
					pendAudits={this.state.pendAudits}
					subsStandards={this.state.subsStandards}
				/>
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row className="mt-5">
						<Col className="mb-5 mb-xl-0" xl="7">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Current Standards</h3>
										</div>
										<div className="col text-right">
											<Link to={{
												pathname: '/superadmin/index',
												state: {
													name: "Food Quality 1.3"
												}
											}}>
												<Button
													color="success"
													size="sm"
												>
													See All
                        						</Button>
											</Link>
										</div>
									</Row>
								</CardHeader>
								{this.state.loading ?
									<CardBody>
										<div className="text-center">
											<Spinner st color="primary" />
										</div>
									</CardBody>
									:
									<Table className="align-items-center table-flush" responsive>
										<thead className="thead-light">
											<tr>
												<th scope="col">Name</th>
												<th scope="col">Article Count</th>
												<th scope="col">Details</th>
												<th scope="col">Progress</th>
											</tr>
										</thead>
										<tbody>
											
										</tbody>
									</Table>
								}
							</Card>
						</Col>
					
					</Row>
					<Row className="mt-5">
						<Col className="mb-5 mb-xl-0" xl="12">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">CLients</h3>
										</div>
										<div className="col text-right">
											<Link to={{
												pathname: '/superadmin/index',
												state: {
													name: "Food Quality 1.3"
												}
											}}>
												<Button color="success" size="sm">
													See All
                        						</Button>
											</Link>
										</div>
									</Row>
								</CardHeader>
								{this.state.loading ?
									<CardBody>
										<div className="text-center">
											<Spinner st color="primary" />
										</div>
									</CardBody>
									:
									<Table className="align-items-center table-flush" responsive>
										<thead className="thead-light">
											<tr>
												<th scope="col">Name</th>
												<th scope="col">Role</th>
												<th scope="col">Assigned Workflows</th>
												<th scope="col">Assigned Articles</th>
												<th scope="col"></th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody>
											
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

export default SuperAdminIndex;
