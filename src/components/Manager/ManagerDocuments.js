/*! Developed by Alinon */
import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';

import {
	Button,
	Card,
	CardHeader,
	CardBody,
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


import Header from "components/Manager/Headers/EmptyHeader.js";

class ManagerDocuments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			documentModel: false,
			roleModel: false,
			documents: [],
			roles: [],
			uploadDocument: null,
			loading: true,
			documentIndex: null,
			currentRole: null,
			tempRoles: [],
			removedRoles: [],
		};
	}

	componentDidMount() {
		//Check if auth token in valid
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		//console.warn('user ' + userId + 'client ' + clientId);

		if (clientId != null && userId != null) {
			const data = {
				"clientId": clientId,
				"userId": userId
			}
			axios.post(constants["apiUrl"] + '/documents/getUploaded', data)
				.then((res) => {
					let data = res.data;
					this.setState({
						documents: data.documents,
						loading: false
					})
				})
				.catch((error) => {
					console.warn(JSON.stringify(error));
				});
			axios.post(constants["apiUrl"] + '/roles/all', data)
				.then((res) => {
					let data = res.data;
					this.setState({
						roles: data.roles,
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

	toggleModal = state => {
		console.log(state);
		this.setState({
			[state]: !this.state[state]
		});
	};

	handleDocumentName = (event) => {
		this.setState({ documentName: event.target.value });
		//console.warn(this.state.documentName)
	}

	handleDocumentDesc = (event) => {
		this.setState({ documentDesc: event.target.value });
	}

	chooseFile = (event) => {
		this.setState({
			uploadDocument: event.target.files[0]
		});
	}

	toggleDropdown = (state) => {
		this.setState({
			[state]: !this.state[state]
		});
	};

	selectRole = (role) => {
		let updatedRemovedRoles = this.state.removedRoles.filter(function (r) { return r.id !== role.id; });
		let temp = [...this.state.tempRoles];

		temp.push(role);
		console.log('inside the if');
		this.setState({
			tempRoles: temp,
			removedRoles: updatedRemovedRoles
		})
	}

	toggleRoleModal = (state, index = null) => {
		this.setState({
			[state]: !this.state[state],
			documentIndex: index,
			tempRoles: [...this.state.documents[index].userRoles]
		});
	};

	closeRoleModal = () => {
		this.setState({
			currentRole: null,
			roleModel: false,
			documentIndex: null,
			tempRoles: [],
			removedRoles: []
		})
	}


	removeRole = (role, index) => {
		let removedRoles;
		let updatedRoles = [...this.state.tempRoles];
		updatedRoles.splice(index, 1);

		removedRoles = [...this.state.removedRoles];
		removedRoles.push(role);

		this.setState({
			removedRoles: removedRoles,
			tempRoles: updatedRoles
		})
	}

	updateRoles = () => {
		let updatedDocs = [];
		if (this.state.tempRoles.length != 0) {
			this.state.tempRoles.forEach(role => {
				if (!this.state.documents[this.state.documentIndex].userRoles.some( r => r.id === role.id )) {
					const data = new FormData();
					data.append("documentId", this.state.documents[this.state.documentIndex].id);
					data.append("roleId", role.id);
					updatedDocs = [...this.state.documents];
					updatedDocs[this.state.documentIndex].userRoles.push(role);

					axios.post(constants["apiUrl"] + '/documents/addRole', data)
						.then((res) => {
							let data = res.data;

							this.setState({
								currentRole: null,
								roleModel: false,
								documentIndex: null,
								documents: updatedDocs,
								tempRoles: [],
								removedRoles: []
							})
							this.forceUpdate();
						})
						.catch((error) => {
							console.warn(JSON.stringify(error));
						});
				}
			});
		}
		// updatedDocs = [];
		if (this.state.removedRoles.length != 0) {
			this.state.removedRoles.forEach(role => {
				const data = new FormData();
				data.append("documentId", this.state.documents[this.state.documentIndex].id);
				data.append("roleId", role.id);
				updatedDocs = [...this.state.documents];
				updatedDocs[this.state.documentIndex].userRoles = updatedDocs[this.state.documentIndex].userRoles.filter(function (r) { return r.id !== role.id; });

				axios.post(constants["apiUrl"] + '/documents/removeRole', data)
					.then((res) => {
						let data = res.data;
						console.warn(JSON.stringify(data));
						this.setState({
							currentRole: null,
							roleModel: false,
							documentIndex: null,
							documents: updatedDocs,
							tempRoles: [],
							removedRoles: []
						})
					})
					.catch((error) => {
						console.warn(JSON.stringify(error));
					});
			});
		} else {
			this.setState({
				currentRole: null,
				roleModel: false,
				documentIndex: null,
				tempRoles: [],
				removedRoles: []
			})
		}
	}

	removeRole = (role, index) => {
		let removedRoles;
		let updatedRoles = [...this.state.tempRoles];
		updatedRoles.splice(index, 1);

		removedRoles = [...this.state.removedRoles];
		removedRoles.push(role);

		this.setState({
			removedRoles: removedRoles,
			tempRoles: updatedRoles
		})
	}

	handleUpload = () => {
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		//console.warn('user ' + userId + 'client ' + clientId);


		if (clientId != null && userId != null) {
			let data = new FormData();

			data.append("clientId", clientId);
			data.append("userId", userId);
			data.append("name", this.state.documentName);
			data.append("description", this.state.documentDesc);
			data.append("file", this.state.uploadDocument);

			axios.post(constants["apiUrl"] + '/documents/upload', data)
				.then((res) => {
					this.forceUpdate();
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
				<Container className="mt--7" fluid>
					<Row className="mt-5">
						<Col xl>
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Uploaded Documents</h3>
										</div>
										<div className="col text-right">
											<Link to={{
												pathname: '/manager/docs',
											}} style={{ paddingRight: 5 }}>
												<Button color="success" size="sm">
													See All
                        						</Button>
											</Link>
											<Button color="success" onClick={() => this.toggleModal("documentModel")} size="sm">
												Add Document
                      						</Button>
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
												<th scope="col">Size</th>
												<th scope="col">Uploaded On</th>
												<th scope="col">Accepted</th>
												<th scope="col">Assigned Roles</th>
												<th scope="col"></th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody>
											{this.state.documents.map((doc, index) => {
												// const date = moment(doc.updated_at).format('DD MMM, YYYY');
												const date = new Date(doc.updated_at).toLocaleString();
												return (
													<tr key={index}>
														<th scope="row">{doc.name}</th>
														<td>{doc.size} KB</td>
														<td>
															<div className="d-flex align-items-center">
																<span className="mr-2">{date}</span>
															</div>
														</td>
														<td>{doc.acceptedCount}/{doc.acceptedTotal}</td>
														<td>
															{doc.userRoles.map(role => {
																return (
																	<h4><span className="badge badge-primary">{role.name}</span></h4>
																)
															})}
														</td>
														<td>
															<Button
																color="primary"
																onClick={() => this.toggleRoleModal("roleModel", index)}
																size="sm"
															>
																Edit
                              								</Button>
														</td>
														<td>
															<Link to={{
																pathname: '/manager/view/document/' + doc.id
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
										<Modal
											size="sm"
											className="modal-dialog-centered"
											isOpen={this.state.roleModel}
											toggle={() => this.closeRoleModal("roleModel")}
										>
											<div className="modal-header">
												<h2 className="modal-title" id="roleModelLabel">
													Add/Remove Role
                          						</h2>
												<button
													aria-label="Close"
													className="close"
													data-dismiss="modal"
													type="button"
													onClick={() => this.closeRoleModal("roleModel")}
												>
													<span aria-hidden={true}>×</span>
												</button>
											</div>
											<div className="modal-body">
												<Row>
													{this.state.documentIndex != null ? this.state.tempRoles.map((role, index) => {
														return (
															<Col key={index} sm="auto">
																<h4><span class="badge badge-primary">{role.name}</span>
																	<button aria-label="Close" className="close" data-dismiss="modal" type="button">
																		<span class="badge badge-warning" onClick={() => this.removeRole(role, index)} aria-hidden={true}>×</span>
																	</button>
																</h4>
															</Col>
														)
													})
														: null}
												</Row>
												<br></br>
												<Row className="justify-content-md-center">
													<Col xl="auto">
														<Dropdown isOpen={this.state.toggleDropdown} toggle={() => this.toggleDropdown("toggleDropdown")}>
															<DropdownToggle caret>
																{this.state.currentRole == null ? <>Select Role</> : this.state.currentRole.name}
															</DropdownToggle>
															<DropdownMenu>
																{this.state.roles.map((role, index) => {
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
																})}
															</DropdownMenu>
														</Dropdown>
													</Col>
												</Row>
											</div>
											<div className="modal-footer">
												<Button
													color="secondary"
													data-dismiss="modal"
													type="button"
													onClick={() => this.closeRoleModal()}
												>
													Cancel
                          </Button>
												<Button onClick={() => this.updateRoles()} color="success" type="button">
													Save
                          </Button>
											</div>
										</Modal>
									</Table>
								}
								<Modal
									className="modal-dialog-centered"
									isOpen={this.state.documentModel}
									toggle={() => this.toggleModal("documentModel")}
								>
									<div className="modal-header">
										<h2 className="modal-title" id="documentModelLabel">
											Add Document
                          				</h2>
										<button
											aria-label="Close"
											className="close"
											data-dismiss="modal"
											type="button"
											onClick={() => this.toggleModal("documentModel")}
										>
											<span aria-hidden={true}>×</span>
										</button>
									</div>
									<div className="modal-body">
										<form>
											<div class="form-group">
												<label for="recipient-name" class="col-form-label">Name:</label>
												<input type="text" class="form-control" id="recipient-name" onChange={this.handleDocumentName}></input>
											</div>
											<div class="form-group">
												<label for="message-text" class="col-form-label" onChange={this.handleDocumentDesc}>Description:</label>
												<textarea class="form-control" id="message-text"></textarea>
											</div>
											<div className="align-items-center">
												<input type="file" name="file" onChange={e => this.chooseFile(e)} />
											</div>
										</form>
									</div>
									<div className="modal-footer">
										<Button
											color="secondary"
											data-dismiss="modal"
											type="button"
											onClick={() => this.toggleModal("documentModel")}
										>
											Cancel
                          					</Button>
										<Button color="success" type="button" onClick={this.handleUpload}>
											Upload
                          					</Button>
									</div>
								</Modal>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default ManagerDocuments;
