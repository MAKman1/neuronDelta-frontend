/*! Developed by Alinon */
import React, { useState, useEffect } from "react";
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

import { Worker, Viewer } from '@react-pdf-viewer/core';

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ViewDocument = (props) => {
	const documentId = props.match.params.documentId;
	const [document, setDocument] = useState( null);

	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	useEffect(() => {

		let clientId = reactLocalStorage.get('clientId', true);

		if (clientId != null) {
			const data = {
				"documentId": documentId,
				"clientId": clientId,

			}
			axios.post(constants["apiUrl"] + '/documents/get', data)
				.then((res) => {
					let data = res.data;
					setDocument( data.document)
				})
				.catch((error) => {
					console.warn(JSON.stringify(error));
				});
		} else {
			//TODO: go back to login
		}

	}, [])

	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.js">
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
											<h1 className="mb-0">{document != null ? document.name : ""}</h1>
										</div>
									</Row>
									<Row className="align-items-center">
										<div className="col">
											<h4 className="mb-0">{document != null ? document.description : ""}</h4>
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
											height: '100%', width: '100%',
										}}>
											{document != null ?
												<Viewer
													plugins={[
														defaultLayoutPluginInstance
													]}
													fileUrl={"https://cors-anywhere.herokuapp.com/" + constants.appUrl + document.path} />
												:
												null
											}
										</div>
									</Row>
								</CardHeader>

							</Card>
						</Col>
					</Row>
				</Container>
			</>
		</Worker>
	);

}
export default ViewDocument;

