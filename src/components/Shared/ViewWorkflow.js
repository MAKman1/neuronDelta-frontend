/*! Developed by Alinon */
import React from "react";

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
	Modal
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
			
			addItemModal: false,
			documentModel: false,
			uploadDocument: null,
			currentChecklistIndex: null
		};
	}


	componentDidMount() {
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

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
						items: data.workflow.items
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

		this.setState({itemName: event.target.value})
		
	}

	handleItemDesc = (event)=> {
		console.warn(this.state.itemDesc)
		this.setState({
			itemDesc: event.target.value
		})
	}

	handleAddNewItem = () => {
		
		let clientId = reactLocalStorage.get('clientId', true);
		if (clientId !== null) {
			const data = {
				
				"workflowId": this.state.workflowId,
				"name": this.state.itemName,
				"description": this.state.itemDesc
				
			}
			axios.post(constants["apiUrl"] + '/workflows/addWorkflowItem', data)
				.then((res) => {
					let data = res.data;
					console.warn(JSON.stringify(data));
					this.setState({
						
					})
					this.closeAddItemModal();
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
			addItemModal: false
		})
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
								</CardHeader>

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
											<Button color="success" onClick = {() => this.openAddItemModal()} size="sm"> 
												Add New Item
											</Button> 
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
														<th scope = "row">
															<div class="form-check">
																{item.done == 0 ?
																	<input class="form-check-input" style={{ width: 17, height: 17 }} type="checkbox"  id={"Check" + item.id} />
																	:
																	<input class="form-check-input" style={{ width: 17, height: 17 }} type="checkbox"  defaultChecked id={"Check" + item.id} />
																}
																<label class="form-check-label " for="defaultCheck1"></label>
															</div>

														</th>
														<td>
															{item.name}
														</td>
														<td>
															{item.description}
														</td>
														<td>
															{item.details}
														</td>

														<td>
														<Button color="success" size="sm"> 
														Add Document 
														</Button> 
														
														</td>
													</tr>
												)
											})
										}

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

export default ViewWorkflow;
