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
import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";
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
			email: '',
			clients: [],
			standards: [],
			subscriptions: []
		};
	}

	componentDidMount() {
		let type = reactLocalStorage.get('userType', true);
		type = 3
		console.warn(type)
		if (type == 3) {
			console.warn("here")
			axios.post(constants["apiUrl"] + '/admin/getDashboard')
			.then((res) => {
				let data = res.data;
				console.warn(data)
				this.setState({
					standards: data.standards,
					clients: data.clients,
					subscriptions: data.subscriptions
				})
			})
			.catch((error) => {
				console.warn(JSON.stringify(error));
			});

		}

		
		
	}

	

	render() {
		return (
			<>
				<EmptyHeader
				/>
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row className="mt-5">
						<Col className="mb-5 mb-xl-0" xl="12">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Standards</h3>
										</div>
										<div className="col text-right">
											<Link to={{
												pathname: '/master/standards',
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
												<th scope="col">Description</th>
												<th scope="col">Version</th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody>
											
											{this.state.standards.map(standard => {
												return (
													<tr>
														<th style={{width: 80}} scope="row">
															{standard.name}
														</th>
														<td style={{ maxWidth: 150 }}>
															<text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
																{standard.description ? standard.description : '-'}
															</text>
														</td>
														<td style={{width: 40}}>
															{standard.version}
														</td>
														<td style={{width: 40}}>
															<Link to={{
																pathname: '/master/view/standard/' + standard.id,
															}}>
																<Button color="primary" size="sm">
																View
																</Button>
															</Link>
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
					<Row className="mt-5">
						<Col className="mb-5 mb-xl-0" xl="12">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Clients</h3>
										</div>
										<div className="col text-right">
											<Link to={{
												pathname: '/master/clients',
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
												<th scope="col">User Count</th>
												<th scope="col">Description</th>
												<th scope="col">Website</th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody>
											{this.state.clients.map(client => {
												return(
												
												<tr>
													<th style={{width: 80}} scope="row">
														{client.name}
													</th>
													<td style={{width: 40}}>
														{client.user_count}
													</td>
													<td style={{ maxWidth: 150 }}>
															<text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
																{client.description ? client.description : '-'}
															</text>
													</td>
													<td style={{width: 40}}>
														{client.website}
													</td>
													<td style={{width: 40}}>
															<Link to={{
																pathname: '/master/view/client/' + client.id,
															}}>
																<Button color="primary" size="sm">
																View
																</Button>
															</Link>
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
					<Row className="mt-5">
						<Col className="mb-5 mb-xl-0" xl="12">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Subscriptions</h3>
										</div>
										<div className="col text-right">
											<Link to={{
												pathname: '/master/subscription',
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
												<th scope="col">Client</th>
												<th scope="col">Standard</th>
												<th scope="col">Notes</th>
											</tr>
										</thead>
										<tbody>
											{this.state.subscriptions.map(sub => {
												return (
													<tr>
														<th scope = "row">
															{sub.client.name}
														</th>
														<td>
															{sub.standard.name}
														</td>
														<td>
															{sub.notes}
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

export default SuperAdminIndex;
