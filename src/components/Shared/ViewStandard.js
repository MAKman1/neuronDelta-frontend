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
	Spinner,
	CardBody
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";
// import User from "components/User/User";
// import Roles from "./Popups/Roles.js"

class ViewStandard extends React.Component {

	standardId = this.props.match.params.standardId;

	constructor(props) {
		super(props);

		this.state = {
			standard: null,
			articles: [],
			loading: true
		};
	}

	handleClick = () => {

	}
	toggleModal = state => {
		console.log(state);
		this.setState({
			[state]: !this.state[state]
		});
	};

	componentDidMount() {
		//Check if auth token in valid
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		//console.warn('user ' + userId + 'client ' + clientId);

		if (clientId != null && userId != null) {
			const data = {
				"standardId": this.standardId,
				"clientId": clientId,

			}
			axios.post(constants["apiUrl"] + '/standards/get', data)
				.then((res) => {
					let data = res.data;
					//console.warn(JSON.stringify(data));
					this.setState({
						articles: data.articles,
						standard: data.standard,
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
												<h1 className="mb-0">{this.state.standard == null ? "" : this.state.standard.name}</h1>
											</div>
										</Row>
										<Row className="align-items-center">
											<div className="col">
												<h4 className="mb-0">{this.state.standard == null ? "" : this.state.standard.description}</h4>
											</div>
										</Row>
									</CardHeader>
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
											<h3 className="mb-0">{"Standard " + this.standardId}</h3>

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
												<th scope="col">CheckList Count</th>
												<th scope="col">Assigned To</th>
												<th scope="col">Due Date</th>

												<th scope="col">Standards</th>
												<th scope="col">Progress</th>
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
														<td>{article.standard.id}</td>
														<td>
															<i className="fas fa-arrow-up text-success mr-3" />{" "}
															{article.progress ? Number.isInteger(article.progress) ? article.progress + '%' : article.progress.toFixed(2) + '%' : '-' }
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

export default ViewStandard;
