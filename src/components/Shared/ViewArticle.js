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

class ViewArticle extends React.Component {

	articleId = this.props.match.params.articleId;

	constructor(props) {
		super(props);
		this.state = {
			checklists: [],
			article: null,
			standard: null,
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
				"clientId": clientId,
				"articleId": this.articleId,
				"userId": userId
			}
			axios.post(constants["apiUrl"] + '/checklists/get', data)
				.then((res) => {
					let data = res.data;
					console.warn(JSON.stringify(data));
					this.setState({
						checklists: data.checklists,
						article: data.article,
						standard: data.standard
					})
				})
				.catch((error) => {
					console.warn(JSON.stringify(error));
				});
		} else {
			//TODO: go back to login
		}
	}

	handleCheckClick = (checklist, current) => {
		//Check if auth token in valid
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		let url = current == true ? "/checklists/uncheck" : "/checklists/check";

		if (clientId !== null && userId !== null) {
			const data = {
				"clientId": clientId,
				"checklistId": checklist.id,
				"userId": userId
			}
			axios.post(constants["apiUrl"] + url, data)
				.then((res) => {

					if (current)
						checklist.progress = null;
					else
						checklist.progress = res.data.progress;

					this.forceUpdate();

				})
				.catch((error) => {
					this.forceUpdate();
					console.warn(JSON.stringify(error));
				});
		} else {
			//TODO: go back to login
		}
	}

	toggleModal = (state, index) => {
		this.setState({
			[state]: !this.state[state],
			currentChecklistIndex: index
		});
	};

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

			data.append("clientId", clientId);
			data.append("userId", userId);
			data.append('checklistId', this.state.checklists[ this.state.currentChecklistIndex].id);
			data.append("file", this.state.uploadDocument);

			// console.warn(...data);

			axios.post(constants["apiUrl"] + '/checklists/attachDocument', data)
				.then((res) => {
					let data = res.data;
					this.state.checklists[ this.state.currentChecklistIndex].progress.document_id = res.data.uploaded.id;
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
									<Row className="align-items-center">
										<div className="col">
											<span className="mb-0 badge badge-primary">{this.state.standard == null ? "" : this.state.standard.name}</span>
										</div>
									</Row>
									<Row className="align-items-center" style={{ marginBottom: 10 }}>
										<div className="col">
											<h1 className="mb-0">{this.state.article == null ? "" : this.state.article.name}</h1>
										</div>
									</Row>
									<Row className="align-items-center">
										<div className="col">
											<h4 className="mb-0">{this.state.article == null ? "" : this.state.article.description}</h4>
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
											<h3 className="mb-0">Article  {this.articleId}</h3>
										</div>
										<div className="col text-right">

										</div>

									</Row>
								</CardHeader>
								<Table className="align-items-center table-flush">
									<thead className="thead-light">
										<tr>
											<th scope="col"></th>
											<th scope="col">Name</th>
											<th scope="col">Description</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>
										{
											this.state.checklists.map((c, index) => {
												return (
													<tr>
														<th scope="row">
															<div class="form-check">
																{c.progress == null ?
																	<input class="form-check-input" style={{ width: 17, height: 17 }} type="checkbox" onChange={() => this.handleCheckClick(c, false)} id={"Check" + c.id} />
																	:
																	<input class="form-check-input" style={{ width: 17, height: 17 }} type="checkbox" onChange={() => this.handleCheckClick(c, true)} defaultChecked id={"Check" + c.id} />
																}
																<label class="form-check-label " for="defaultCheck1"></label>
															</div>
														</th>
														<td>{c.name}</td>
														<td>
															<text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
																{c.details}
															</text>
														</td>
														<td>
															{c.progress == null ? null
																: (c.progress.document_id == null ? <Button color="success" onClick={() => this.toggleModal("documentModel", index)} size="sm"> Add Document </Button> : <Button color="primary" size="sm"> View Document </Button>)
															}
														</td>
													</tr>
												)
											})
										}

									</tbody>
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
								</Table>
							</Card>
						</Col>
					</Row>

				</Container>
			</>
		);
	}
}

export default ViewArticle;
