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
	Col
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";
import SearchPlugin from "./plugins/SearchPlugin.js";

import { Viewer } from '@react-pdf-viewer/core';
import ToolbarPlugin from "./plugins/ToolbarPlugin.js";


class ViewDocument extends React.Component {

	documentId = this.props.match.params.documentId;

	constructor(props) {
		super(props);

		this.state = {
			document: null
		};
	}

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
			// axios.post(constants["apiUrl"] + '/standards/get', data)
			// 	.then((res) => {
			// 		let data = res.data;
			// 		//console.warn(JSON.stringify(data));
			// 		this.setState({
			// 			articles: data.articles,
			// 			standard: data.standard
			// 		})
			// 	})
			// 	.catch((error) => {
			// 		console.warn(JSON.stringify(error));
			// 	});
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
									<Row className="align-items-center" style={{ marginBottom: 10 }}>
										<div className="col">
											<h1 className="mb-0">{"Name"}</h1>
										</div>
									</Row>
									<Row className="align-items-center">
										<div className="col">
											<h4 className="mb-0">{"Description"}</h4>
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
									<Row className="align-items-center" style={{ marginBottom: 10 }}>
										<div className="col" style={{
											height: '100%',
										}}>
											<Viewer
												plugins={[
													SearchPlugin,
													ToolbarPlugin
												]}
												fileUrl="https://cors-anywhere.herokuapp.com/https://alinon.online/public/storage/documents/j4NcmN2sE8UpgNMV5Vfh_1609553350.pdf" />
										</div>
									</Row>
								</CardHeader>

							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default ViewDocument;

