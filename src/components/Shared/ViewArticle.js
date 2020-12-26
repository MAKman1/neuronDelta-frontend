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
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";
// import Roles from "./Popups/Roles.js"

class ManagerIndex extends React.Component {

	articleId = this.props.match.params.articleId;

	constructor(props) {
		super(props);
		this.state = {
			checklists: [],
			article: null,
			standard: null
		};
	}


	componentDidMount() {
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		//console.warn('user ' + userId + 'client ' + clientId + this.articleId);

		if (clientId != null && userId != null) {
			const data = {
				"clientId": clientId,
				"articleId": this.articleId,
				"userId": userId
			}
			axios.post(constants["apiUrl"] + '/checklists/get', data)
				.then((res) => {
					let data = res.data;
					//console.warn(JSON.stringify(data));
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

	handleCheckClick = (id, current) => {
		//Check if auth token in valid
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		let url = current == true ? "/checklists/uncheck" : "/checklists/check";

		if (clientId != null && userId != null) {
			const data = {
				"clientId": clientId,
				"checklistId": id,
				"userId": userId
			}
			axios.post(constants["apiUrl"] + url, data)
				.then((res) => {
					let data = res.data;
					//Show that it's done
				})
				.catch((error) => {
					console.warn(JSON.stringify(error));
				});
		} else {
			//TODO: go back to login
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
								<CardHeader className="border-0">
									<Row className="align-items-center">
										<div className="col">
											<span className="mb-0 badge badge-primary">{this.state.standard == null ? "" : this.state.standard.name}</span>
										</div>
									</Row>
									<Row className="align-items-center" style={{marginBottom: 10}}>
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
											this.state.checklists.map(c => {
												return (
													<tr>
														<th scope="row">
															<div class="form-check">
																{c.progress == null ?
																	<input class="form-check-input" style={{ width: 17, height: 17 }} type="checkbox" onChange={() => this.handleCheckClick(c.id, false)} id={"Check" + c.id} />
																	:
																	<input class="form-check-input" style={{ width: 17, height: 17 }} type="checkbox" onChange={() => this.handleCheckClick(c.id, true)} defaultChecked id={"Check" + c.id} />
																}
																<label class="form-check-label " for="defaultCheck1"></label>
															</div>
														</th>
														<td>Food Safety</td>
														<td>The Kitchen used to prepare the food should follow Health Standard 1.3</td>
														<td>
															{c.progress != null && <Button color="success" size="sm"> Add Document </Button>}
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

export default ManagerIndex;
