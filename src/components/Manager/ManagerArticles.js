/*! Developed by Alinon */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';
import '../../assets/customcss/dropdown.css';
import routes from "routes.js";
// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	Table,
	Container,
	Row,
	Col,
	Modal,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Spinner
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";
// import User from "components/User/User";
// import Roles from "./Popups/Roles.js"

class ManagerArticles extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			assignModel: false,
			roleModel: false,
			toggleDropdown: false,
			modelName: '',
			name: "None",
			articles: [],
			selected: 'Select User',
			users: null,
			loading: true
		};


		// this.handleSelect = this.handleSelect.bind(this);

	}



	handleSelect(username) {
		console.warn('fuck');
		this.setState({
			selected: username
		});
	}

	componentDidMount() {
		//Check if auth token in valid
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		//console.warn('user ' + userId + 'client ' + clientId);

		if (clientId != null && userId != null) {
			const data = {
				"clientId": clientId,
			}
			axios.post(constants["apiUrl"] + '/articles/getAllManager', data)
				.then((res) => {
					let data = res.data;
					console.warn(JSON.stringify(data));
					this.setState({
						articles: data.articles,
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


	toggleModal = (state) => {
		this.setState({
			[state]: !this.state[state],
		});


		if (this.state[state] == false) {
			let userId = reactLocalStorage.get('userId', true);
			let clientId = reactLocalStorage.get('clientId', true);

			//console.warn('user ' + userId + 'client ' + clientId);

			if (clientId != null && userId != null) {
				const data = {
					"clientId": clientId,
				}
				axios.post(constants["apiUrl"] + '/user/get', data)
					.then((res) => {
						let data = res.data;
						console.warn(JSON.stringify(data));
						this.setState({
							users: data.users,
						})
					})
					.catch((error) => {
						console.warn(JSON.stringify(error));
					});

			} else {
				//TODO: go back to login
			}
		} else {
			this.setState({
				users: null,
			});
		}

	};

	toggleDropdown = () => {
		this.setState({
			toggleDropdown: !this.state["toggleDropdown"],
		});
	};

	render() {
		return (
			<>
				<EmptyHeader />'
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row className="mt-5">
						<Col className="mb-5 mb-xl-0" xl="12">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Articles</h3>
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
									<Table className="align-items-center table-flush">
										<thead className="thead-light">
											<tr>
												<th scope="col">Name</th>
												<th scope="col">Checklist Count</th>
												<th scope="col">Assigned To</th>
												<th scope="col">Due Date</th>
												<th scope="col">Standards</th>
												<th scope="col">Progress</th>
												<th scope="col"></th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody>

											{this.state.articles.map(article => {
												return (
													<tr>
														<th scope="row">{article.name}</th>
														<td>{article.checklistCount}</td>
														<td>{article.assignedTo == null ? "-" : article.assignedTo.name}</td>
														<td>-</td>
														<td>
															<div className="d-flex align-items-center">
																<span className="mr-2">{article.standard.id}</span>
															</div>
														</td>
														<td>
															<i className="fas fa-arrow-up text-success mr-3" />{" "}
															{article.progress}%
                          							</td>
														<td>

															<Link to={{
																pathname: '/manager/view/article/' + article.id,
																state: {
																	name: "Food Quality 1.3"
																}
															}}>
																<Button color="primary" size="sm">
																	View
                                							</Button>
															</Link>
														</td>
														<td>
															<Button color="success" onClick={() => this.toggleModal("assignModel")} size="sm">
																Assign
                          								</Button>
															<Modal
																className="modal-dialog-centered"
																isOpen={this.state.assignModel}
																defaultValue={article.id}
																toggle={() => this.toggleModal("assignModel")}
															>
																<div className="modal-header">
																	<h2 className="modal-title" id="assignModelLabel">
																		Article {this.state.articleName}
																	</h2>
																	<button
																		aria-label="Close"
																		className="close"
																		data-dismiss="modal"
																		type="button"
																		onClick={() => this.toggleModal("assignModel")}
																	>
																		<span aria-hidden={true}>×</span>
																	</button>
																</div>
																<div className="modal-body">
																	<Row className="justify-content-md-center">
																		<Col xl="auto">
																			{this.state.users != null ?
																				<Dropdown isOpen={this.state.toggleDropdown} toggle={() => this.toggleDropdown()}>
																					<DropdownToggle caret>
																						{this.state.selected}
																					</DropdownToggle>
																					<DropdownMenu container="body">

																						{this.state.users.map((user, index) => {

																							return (<DropdownItem key={index}>
																								<div onClick={console.warn("left")}>{user.name}</div>
																							</DropdownItem>
																							)
																						})}
																					</DropdownMenu>
																				</Dropdown>
																				:
																				<div>Loading...</div>
																			}
																		</Col>
																	</Row>
																</div>
																<div className="modal-footer">
																	<Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.toggleModal("assignModel")}>
																		Cancel
                              									</Button>
																	<Button color="success" type="button">
																		Assign
                              									</Button>
																</div>
															</Modal>
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

export default ManagerArticles;
