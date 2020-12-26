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
	Col
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";
// import User from "components/User/User";
// import Roles from "./Popups/Roles.js"

class ViewStandard extends React.Component {

	standardId = this.props.match.params.standardId;

	constructor(props) {
		super(props);

		this.state = {
			documentModel: false,
			roleModel: false,
			toggleDropdown: false,
			name: "None",
			articles: []
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
		  axios.post(constants["apiUrl"] + '/articles/getAll', data)
			.then((res) => {
			  let data = res.data;
			  //console.warn(JSON.stringify(data));
			  this.setState({
				articles: data.articles,
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
								<Table className="align-items-center table-flush">
									<thead className="thead-light">
										<tr>
											<th scope="col">Name</th>
											<th scope="col">Assigned To</th>
											<th scope="col">Due Date</th>
											<th scope="col">Standards</th>
											<th scope="col">Progress</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody>
										{this.state.articles.map(article => {
											return(
												<tr>
													<th scope="row">{article.name}</th>
													<td>Will Cole</td>
													<td>2/01/2021</td>
													<td>{article.standard.id}</td>
													<td>
														<i className="fas fa-arrow-up text-success mr-3" />{" "}
														90%
													</td>
												</tr>
											)
										})}
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

export default ViewStandard;
