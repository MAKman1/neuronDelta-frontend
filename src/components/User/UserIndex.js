/*! Developed by Alinon */
import React from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';
import { Link } from "react-router-dom";


import {
	Button,
	Card,
	CardHeader,
	CardBody,
	Table,
	Container,
	Row,
	Col,
	Spinner
} from "reactstrap";

import Header from "components/User/Headers/DashboardHeader.js";

class UserIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pendArticles: 0,
			compArticles: 0,
			assignedDocs: 0,
			articles: [],
			documents: [],
			assignedWorkflows: [],
			loading: true
		};
	}

	componentDidMount() {
		//Check if auth token in valid
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		//onsole.warn('user ' + userId + 'client ' + clientId);

		if (clientId != null && userId != null) {
			const data = {
				"clientId": clientId,
				"userId": userId
			}
			axios.post(constants["apiUrl"] + '/dashboard/get', data)
				.then((res) => {
					let data = res.data;
					//console.warn(JSON.stringify(data));
					this.setState({
						pendArticles: data.pendingArticles,
						compArticles: data.completedArticles,
						assignedDocs: data.assignedDocuments,
						articles: data.assignedArticles,
						documents: data.documents,
						assignedWorkflows: data.assignedWorkflows,
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

	acceptDocument(index) {
		this.state.documents[index].accepted = true;
		this.forceUpdate();

		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		if (clientId != null && userId != null) {
			let data = new FormData();

			data.append("clientId", clientId);
			data.append("userId", userId);
			data.append("documentId", this.state.documents[index].id);

			axios.post(constants["apiUrl"] + '/documents/accept', data)
				.then((res) => {
					let data = res.data;
					console.warn(JSON.stringify(data));
				})
				.catch((error) => {
					console.warn(JSON.stringify(error));
				});
		}
	}

	render() {
		return (
			<>
				<Header
					pendArticles={this.state.pendArticles}
					compArticles={this.state.compArticles}
					assignedDocs={this.state.assignedDocs}
				/>
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row className="mt-5">
						<Col className="mb-5 mb-xl-0" xl="7">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Assigned Articles</h3>
										</div>
										<div className="col text-right">
											<Link to={{
												pathname: '/user/audit',
											}} style={{ paddingRight: 5 }}>
												<Button color="primary" size="sm">
													See All
                        						</Button>
											</Link>
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
												<th scope="col">Standard</th>
												<th scope="col">Progress</th>
												<th scope="col"></th>
											</tr>
										</thead>
										<tbody>
											{this.state.articles.map(a => {
												{ this.state.pathname = '/user/view/article/' + a.id }
												return (
													<tr>
														<th scope="row">{a.name}</th>
														<td>{a.assignedBy.name}</td>
														<td>-</td>
														<td>{a.standard.name}</td>
														<td>
															<i className="fas fa-arrow-up text-success mr-3" />{" "}
															{Number.isInteger(a.progress) ? a.progress : a.progress.toFixed(2)}%
                      									</td>
														<td className="text-center">
															<Link to={{
																pathname: this.state.pathname,
																state: {
																	name: "Food Quality 1.3"
																}
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
						<Col xl="5">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Assigned Documents</h3>
										</div>
										<div className="col text-right">
											<Link to={{
												pathname: '/user/docs',
											}} style={{ paddingRight: 5 }}>
												<Button color="primary" size="sm">
													See All
                        						</Button>
											</Link>
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
												<th scope="col">File Size</th>
												<th scope="col">Assigned By</th>
												<th className="text-center" scope="col">Accepted</th>
												<th className="text-center" scope="col">File</th>
											</tr>
										</thead>
										<tbody>
											{this.state.documents.map( (doc, index) => {
												return (
													<tr>
														<th scope="row">{doc.name}</th>
														<td>{doc.size} KB</td>
														<th >{doc.assignedBy ? doc.assignedBy : '-' }</th>
														<td className="text-center">
															{doc.accepted ? <i class="fas fa-check"></i>
																: <Button color="success" href="#pablo" onClick={() => this.acceptDocument(index)} size="sm"> Accept </Button>
															}
														</td>
														<td className="text-center">
															<Link to={{
																pathname: '/user/view/document/' + doc.id
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
						<Col xl>
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<h3 className="mb-0">Assigned Workflows</h3>
										</div>
										<div className="col text-right">
											<Link to={{
												pathname: '/user/workflow',
											}} style={{ paddingRight: 5 }}>
												<Button color="primary" size="sm">
													See All
                        						</Button>
											</Link>
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
											{this.state.assignedWorkflows.map(w => {
												return (
													<tr>
														<th scope="row">{w.name}</th>
														<td>{w.assignedBy ? w.assignedBy.name : "-"}</td>
														<td>-</td>
														<td>
															<i className="fas fa-arrow-up text-success mr-3" />{" "}
															{Number.isInteger(w.progress) ? w.progress : w.progress.toFixed(2)}%
                      									</td>
														<td className="text-center">
															<Link to={{
																pathname: 'user/view/document/1'
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
				</Container>
			</>
		);
	}
}

export default UserIndex;
