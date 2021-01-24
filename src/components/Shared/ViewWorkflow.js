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
	Col,
	Modal,
	CardBody,
	Spinner,
	UncontrolledDropdown,
	DropdownMenu, 
	DropdownItem,
	DropdownToggle,
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";
// import Roles from "./Popups/Roles.js"

class ViewWorkflow extends React.Component {

	workflowId = this.props.match.params.workflowId;

	constructor(props) {
		super(props);
		this.state = {
			name: null,
			itemName: null,
			itemDesc: null,
			desc: null,
			items: [],
			detModal: false,
			details: null,
			index: null,
			addItemModal: false,
			documentModal: false,
			uploadDocument: null,
			loading: true,
			username: "Select User"
		};
	}


	componentDidMount() {
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);
		let type = reactLocalStorage.get('userType', true);

		
		this.setState({
			userType: type
		})

		//console.warn('user ' + userId + 'client ' + clientId + this.articleId);

		if (clientId !== null && userId !== null) {
			const data = {

				"workflowId": this.workflowId,

			}
			axios.post(constants["apiUrl"] + '/workflows/get', data)
				.then((res) => {
					let data = res.data;
					console.warn(JSON.stringify(data));
					this.setState({
						name: data.workflow.name,
						desc: data.workflow.description,
						user: data.workflow.user,
						items: data.workflow.items,
						workflowId: data.workflow.id,
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

	handleItemName = (event) => {

		this.setState({ itemName: event.target.value })

	}

	handleItemDesc = (event) => {
		console.warn(this.state.itemDesc)
		this.setState({
			itemDesc: event.target.value
		})
	}

	handleAddNewItem = () => {

		let clientId = reactLocalStorage.get('clientId', true);
		if (clientId !== null) {
			const data = {

				"workflowId": this.workflowId,
				"name": this.state.itemName,
				"description": this.state.itemDesc

			}
			axios.post(constants["apiUrl"] + '/workflows/addWorkflowItem', data)
				.then((res) => {
					let data = res.data;
					console.warn(JSON.stringify(data));
					this.closeAddItemModal();
					window.location.reload(false)
				})
				.catch((error) => {
					console.warn(JSON.stringify(error));
				});
		} else {
			//TODO: go back to login
		}



	}

	openAddItemModal = () => {
		this.setState({
			addItemModal: true
		})

	}

	closeAddItemModal = () => {
		this.setState({
			addItemModal: false,
			index: null
		})
	}

	handleCheck = (itemId) => {
		let userId = reactLocalStorage.get('userId', true);
		const data = {

			"workflowItemId": itemId,
			"userId": userId

		}
		axios.post(constants["apiUrl"] + '/workflows/check', data)
			.then((res) => {
				let data = res.data;
				console.warn(JSON.stringify(data));
				if (data.done == 1) {
					window.location.reload(false)
				}

			})
			.catch((error) => {
				console.warn(JSON.stringify(error));
			});

	}

	handleUncheck = (itemId) => {
		let userId = reactLocalStorage.get('userId', true);
		const data = {

			"workflowItemId": itemId,
			"userId": userId

		}
		axios.post(constants["apiUrl"] + '/workflows/uncheck', data)
			.then((res) => {
				let data = res.data;
				console.warn(JSON.stringify(data));
				if (data.done == 1) {
					window.location.reload(false)
				}

			})
			.catch((error) => {
				console.warn(JSON.stringify(error));
			});
	}

	openDocumentModal = (index) => {
		this.setState({
			documentModal: true,
			index: index
		})

	}

	closeDocumentModal = () => {
		this.setState({
			documentModal: false,
			index: null,
		})
	}

	chooseFile = (event) => {
		this.setState({
			uploadDocument: event.target.files[0],
		});
	}

	handleUpload = () => {
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		if (clientId !== null && userId !== null) {
			let data = new FormData();

			data.append("workflowItemId", this.state.index);
			data.append("userId", userId);
			data.append("clientId", clientId);
			data.append("file", this.state.uploadDocument);

			// console.warn(...data);

			axios.post(constants["apiUrl"] + '/workflows/attachDocument', data)
				.then((res) => {
					let data = res.data;
					this.state.checklists[this.state.currentChecklistIndex].progress.document_id = res.data.uploaded.id;
					this.forceUpdate();
					console.warn(JSON.stringify(data));
				})
				.catch((error) => {
					console.warn(JSON.stringify(error));
				});
		}

		this.setState({
			uploadDocument: null,
			documentModel: false,
		})
	}

	openDetModal = (itemId) => {
		this.setState({
			detModal: true,
			index: itemId
		})
	}

	closeDetModal = () => {
		this.setState({
			detModal: false,
			index: null
		})
	}

	handleItemDet = (event) => {
		this.setState({
			details: event.target.value
		})
	}

	handleAddDetail = () => {
		const data = {

			"workflowItemId": this.state.index,
			"description": this.state.details

		}
		axios.post(constants["apiUrl"] + '/workflows/addDesciption', data)
			.then((res) => {
				let data = res.data;
				console.warn(JSON.stringify(data));
				this.closeDetModal()
				window.location.reload(false)

			})
			.catch((error) => {
				console.warn(JSON.stringify(error));
			});
	}

	removeAssign = () => {
		let clientId = reactLocalStorage.get('clientId', true);
		const data = {
		"workflowId": this.state.workflowId,
		"userId": this.state.user.id
		}
		axios.post(constants["apiUrl"] + '/workflows/removeAssignment', data)
		.then((res) => {
			let data = res.data;
			console.warn(JSON.stringify(data));
			this.setState({
				user: null,
			})
		})
		.catch((error) => {
			console.warn(JSON.stringify(error));
		});
	}

	closeAssignModal = () => {
		this.setState({
		  assignModal: false
		})
	}

	handleSelect = (username, userId) => {
	this.setState({
		username: username,
		assignId: userId
	})

	}

	handleAssign = () => {

		console.warn("This is response")
		console.warn(this.state.assignId)
		if (this.state.assignId != null) {
		  const data = {
			"workflowId": this.state.workflowId,
			"userId": this.state.assignId,
		  }
	
		  axios.post(constants["apiUrl"] + '/workflows/assign', data)
			.then((res) => {
			  let data = res.data;
			  console.warn(JSON.stringify(data));
			  if (data.done == '1') {
				this.closeAssignModal();
				this.setState({
					user:data.workflow.user
				})
				this.forceUpdate()
			  }
			})
			.catch((error) => {
			  console.warn(JSON.stringify(error));
			});
		}
	  }

	openAssignModal = () => {
		this.setState({
		  assignModal: true,
		  index: this.state.workflowId
		});
	
		let clientId = reactLocalStorage.get('clientId', true);
	
		//console.warn('user ' + userId + 'client ' + clientId);
	
		if (clientId != null) {
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
	
	
		}
	  }

	render() {
		return (
			<>
				<EmptyHeader />
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row className="mt-5 justify-content-center">
						<Col className="mb-5 mb-xl-0" xl="12">
							<Card className="shadow">
								{this.state.loading ?
									<CardBody>
										<div style={{ borderColor: 'black' }} className="text-center">
											<Spinner st color="primary" />
										</div>
									</CardBody>
									:
									<CardHeader className="border-0">
										<Row className="align-items-center" style={{ marginBottom: 10 }}>
											<div className="col">
												<h1 className="mb-0">{this.state.name == null ? "" : this.state.name}</h1>
											</div>
										</Row>
										<Row className="align-items-center">
											<div className="col">
												<h4 className="mb-0">{this.state.desc == null ? "" : this.state.desc}</h4>
											</div>
										</Row>
										{this.state.userType == 2 ?
										<div>
											{this.state.user != null ?
											<div>
											<Row style={{marginTop: 10}} className="align-items-center">
												<div className="col">
													<h3 className="mb-0"><span className="badge badge-primary">Assigned To: {this.state.user.name} </span></h3>
												</div>
											</Row>
											<Button style={{marginTop: 10}} onClick={()=> this.removeAssign()} color="danger"  size="sm">
												Unassign
											</Button>
											</div>
											:
											<div>
											<Button style={{marginTop: 10}} color="success" onClick={() => this.openAssignModal()}  size="sm">
												Assign
											</Button>
											</div>
											}
										</div>:
										<div>

										</div>
										}
									</CardHeader>
								}
								<Modal
									className="modal-dialog-centered"
									isOpen={this.state.assignModal}
									defaultValue={this.state.index}
									toggle={() => this.closeAssignModal()}
									>
									<div className="modal-header">
										<h2 className="modal-title" id="assignModelLabel">
										Workflow {this.state.index}
										</h2>
										<button
										aria-label="Close"
										className="close"
										data-dismiss="modal"
										type="button"
										onClick={() => this.closeAssignModal()}
										>
										<span aria-hidden={true}>×</span>
										</button>
									</div>
									<div className="modal-body">
										<Row className="justify-content-md-center">
										<Col xl="auto">
											{this.state.users != null ?
											<UncontrolledDropdown>
												<DropdownToggle caret>
												{this.state.username}
												</DropdownToggle>
												<DropdownMenu container="body">
												{this.state.users.map((user, index) => {
													return (
													<DropdownItem onClick={() => this.handleSelect(user.name, user.id)} key={index}>
														{user.name}
													</DropdownItem>
													)
												})}
												</DropdownMenu>
											</UncontrolledDropdown>

											:
											<div>Loading...</div>
											}
										</Col>
										</Row>
									</div>
									<div className="modal-footer">
										<Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.closeAssignModal()}>
										Cancel
													</Button>
										<Button color="success" type="button" onClick={() => this.handleAssign()}>
										Assign
													</Button>
									</div>
									</Modal>
							</Card>
						</Col>
					</Row>
					<Row className="mt-5 justify-content-center">
						<Col className="mb-5 mb-xl-0" xl="12">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Workflow Items</h3>
										</div>
										<div className="col text-right">
											{this.state.userType == 2? 
											<div>
												<Button color="success" onClick={() => this.openAddItemModal()} size="sm">
													Add New Item
												</Button>
											</div>:
											<div></div>
											}
											
											
											<Modal
												className="modal-dialog-centered"
												isOpen={this.state.addItemModal}
												toggle={() => this.closeAddItemModal()}
											>
												<div className="modal-header">
													<h2 className="modal-title" id="userModelLabel">
														Add New Item
												</h2>
													<button
														aria-label="Close"
														className="close"
														data-dismiss="modal"
														type="button"
														onClick={() => this.closeAddItemModal()}
													>
														<span aria-hidden={true}>×</span>
													</button>
												</div>
												<div className="modal-body">
													<form>
														<div class="form-group">
															<label for="recipient-name" defaultValue={this.state.itemName} class="col-form-label" >Name:</label>
															<input type="text" class="form-control" id="recipient-name" onChange={this.handleItemName}></input>
														</div>

														<div class="form-group">
															<label for="message-text" class="col-form-label" defaultValue={this.state.itemDesc}>Description:</label>
															<textarea type="text" class="form-control" id="message-text" onChange={this.handleItemDesc}></textarea>
														</div>
													</form>
												</div>
												<div className="modal-footer">
													<Button
														color="secondary"
														data-dismiss="modal"
														type="button"
														onClick={() => this.closeAddItemModal()}
													>
														Cancel
												</Button>
													<Button color="success" type="button" onClick={() => this.handleAddNewItem()}>
														Add
												</Button>
												</div>
											</Modal>
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
												<th scope="col"></th>
												<th scope="col">Name</th>
												<th scope="col">Description</th>
												<th scope="col">Details</th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody>
											{
												this.state.items.map(item => {
													return (
														<tr>
															<th scope="row">
																<div class="form-check">
																	{item.done == 0 ?
																		<input class="form-check-input" style={{ width: 17, height: 17 }} type="checkbox" onClick={() => this.handleCheck(item.id)} id={"Check" + item.id} />
																		:
																		<input class="form-check-input" style={{ width: 17, height: 17 }} type="checkbox" onClick={() => this.handleUncheck(item.id)} defaultChecked id={"Check" + item.id} />
																	}
																	<label class="form-check-label " for="defaultCheck1"></label>
																</div>

															</th>
															<td>
																{item.name}
															</td>
															<td>
																{item.details}
															</td>
															<td>
																{item.done !== 0 ?
																	item.description == null ?
																		<Button color="success" size="sm" onClick={() => this.openDetModal(item.id)}>
																			Add Description
																</Button>
																		:
																		<div>
																			{item.description}
																		</div>
																	:
																	<div>

																	</div>
																}
															</td>

															<td>
																{item.done == 0 ?
																	<p></p>
																	:
																	item.document_id == null ?
																		<Button color="success" size="sm" onClick={() => this.openDocumentModal(item.id)}>
																			Add Document
																		</Button>
																		:
																		<Link to={{
																			pathname: '/manager/view/document/' + item.document_id
																		}}>
																			<Button color="primary" size="sm">
																				View Document
																			</Button>
																		</Link>
																}

															</td>
														</tr>
													)
												})
											}

										</tbody>
										<Modal
											className="modal-dialog-centered"
											isOpen={this.state.documentModal}
											toggle={() => this.closeDocumentModal()}
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
													onClick={() => this.closeDocumentModal()}
												>
													<span aria-hidden={true}>×</span>
												</button>
											</div>
											<div className="modal-body">
												<form>
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
													onClick={() => this.closeDocumentModal()}
												>
													Cancel
                          					</Button>
												<Button color="success" type="button" onClick={() => this.handleUpload()}>
													Upload
                          					</Button>
											</div>
										</Modal>
										<Modal
											className="modal-dialog-centered"
											isOpen={this.state.detModal}
											toggle={() => this.closeDetModal()}
										>
											<div className="modal-header">
												<h2 className="modal-title" id="userModelLabel">
													Add Details
												</h2>
												<button
													aria-label="Close"
													className="close"
													data-dismiss="modal"
													type="button"
													onClick={() => this.closeDetModal()}
												>
													<span aria-hidden={true}>×</span>
												</button>
											</div>
											<div className="modal-body">
												<form>

													<div class="form-group">
														<label for="message-text" class="col-form-label" defaultValue={this.state.itemDesc}>Details:</label>
														<textarea type="text" class="form-control" id="message-text" onChange={this.handleItemDet}></textarea>
													</div>
												</form>
											</div>
											<div className="modal-footer">
												<Button
													color="secondary"
													data-dismiss="modal"
													type="button"
													onClick={() => this.closeDetModal()}
												>
													Cancel
												</Button>
												<Button color="success" type="button" onClick={() => this.handleAddDetail()}>
													Add
												</Button>
											</div>
										</Modal>
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

export default ViewWorkflow;
