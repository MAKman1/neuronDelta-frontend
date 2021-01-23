/*! Developed by Alinon */
import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../../constants.js';

// reactstrap components
import {
Button,
Card,
CardHeader,
CardBody,
Table,
Container,
Row,
Col,
Spinner,
Modal
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";

class SuperAdminViewArticle extends React.Component {

    
constructor(props) {
    super(props);
    this.state = {
    articles: null,
    checklists: [],
    loading: true,
    addModal: false,
    name: null,
    desc: null,
    };
}

articleId = this.props.match.params.articleId;

componentDidMount() {

    const data = {
        "articleId": this.articleId
    }
    

    axios.post(constants["apiUrl"] + '/admin/getArticle', data )
    .then((res) => {
        let data = res.data;
        console.warn(data)
        this.setState({
        article: data.article,
        checklists: data.article.checklists,
        loading: false,
        })
    })
    .catch((error) => {
        console.warn(JSON.stringify(error));
    });
}

openAddModal = () => {
    this.setState({
    addModal: true,
    })
}

closeAddModal = () => {
    this.setState({
    addModal: false,
    name: null,
    desc: null
    })
}

handleName = (event) => {
    this.setState({
    name: event.target.value
    })

}

handleDesc = (event) => {
    this.setState({
    desc: event.target.value
    })
}

handleAdd = () => {

    if (this.state.name != null && this.state.desc != null) {
        const data = {
            
        "name": this.state.name,
        "details": this.state.desc,
        "standardId": this.state.article.standard_id,
        "articleId": this.articleId
        }
        axios.post(constants["apiUrl"] + '/admin/addChecklist', data)
        .then((res) => {
            let data = res.data;
            console.warn(res.data)
            let temp = this.state.checklists
            temp.push(data.checklist)
            this.setState({
            checklists: temp
            })

            this.forceUpdate()
            this.closeAddModal()
        })
        .catch((error) => {
            console.warn(JSON.stringify(error));
        });
    }
}

    handleRemove = (id) => {
        const data = {
            "checklistId": id
        }
        axios.post(constants["apiUrl"] + '/admin/deleteChecklist', data)
        .then((res) => {
            let data = res.data;
            console.warn(res.data)
            let temp = this.state.checklists.filter(checklist => checklist.id != id)
            this.setState({
                checklists: temp
            })

            this.forceUpdate()
            this.closeAddModal()
        })
        .catch((error) => {
            console.warn(JSON.stringify(error));
        });
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
                                        <h1 className="mb-0">{this.state.article == null ? "" : this.state.article.name}</h1>
                                    </div>
                                </Row>
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h4 className="mb-0">{this.state.article == null ? "" : this.state.article.description}</h4>
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
                                    <h3 className="mb-0">{"Article " + this.articleId}</h3>

                                </div>

                                <div className="col text-right">
                                    <Button color="success" onClick={() => this.openAddModal()} size="sm">
                                        Add Checklist Item
                                    </Button>
                                </div>

                                
                            </Row>
                            <Modal
                                className="modal-dialog-centered"
                                isOpen={this.state.addModal}
                                defaultValue={this.state.addModal}
                                toggle={() => this.closeAddModal()}
                            >
                                    <div className="modal-header">
                                    <h2 className="modal-title" id="assignModelLabel">
                                        Add New Standard
                                                    </h2>
                                    <button
                                        aria-label="Close"
                                        className="close"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => this.closeAddModal()}
                                    >
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                    </div>
                                    <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                        <label for="recipient-name" defaultValue={this.state.name} class="col-form-label" >Name:</label>
                                        <input type="text" class="form-control" id="recipient-name" onChange={this.handleName}></input>
                                        </div>
                                        <div class="form-group">
                                        <label for="message-text" class="col-form-label" defaultValue={this.state.desc}>Details:</label>
                                        <textarea class="form-control" id="message-text" id="message-text" onChange={this.handleDesc}></textarea>
                                        </div>
                                    </form>
                                    </div>
                                    <div className="modal-footer">
                                    <Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.closeAddModal()}>
                                        Cancel
                                                                    </Button>
                                    <Button color="success" type="button" onClick={() => this.handleAdd()}>
                                        Add
                                                                    </Button>
                                    </div>
                                </Modal>
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
                                    <tr >
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col"></th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.checklists.map(item => {
                                                return (
                                                    <tr>
                                                        <th style={{width: 60}} scope="row">{item.name}</th>
                                                        <td style={{ maxWidth: 170 }}>
                                                            <text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                                                {item.details}
                                                            </text>
                                                        </td>
                                        
                                                        <td style={{width: 40}}>
                                                            <div className="col text-center">
                                                                <Button color="danger" type="button"  size="sm"onClick={() => this.handleRemove(item.id)}>
                                                                    Delete Item
                                                                </Button>

                                                            </div>
                                                            
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

export default SuperAdminViewArticle;
