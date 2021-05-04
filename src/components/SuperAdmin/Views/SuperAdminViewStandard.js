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

class SuperAdminViewStandards extends React.Component {

    
  constructor(props) {
    super(props);
    this.state = {
      standard: [],
      articles: [],
      loading: true,
      addModal: false,
      name: null,
      desc: null,
    };
  }

  standardId = this.props.match.params.standardId;

  componentDidMount() {

    let type = reactLocalStorage.get('userType', true);

    if (type == 3) {
      const data = {
        "standardId": this.standardId
      }
    

    axios.post(constants["apiUrl"] + '/admin/getStandard', data )
      .then((res) => {
        let data = res.data;
        console.warn(data)
        this.setState({
          standard: data.standard,
          articles: data.standard.articles,
          loading: false,
        })
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });

    } else {
      this.props.history.push("/login");
    }
    

    
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
          "description": this.state.desc,
          "standardId": this.standardId
        }
        axios.post(constants["apiUrl"] + '/admin/addArticle', data)
          .then((res) => {
            let data = res.data;
            console.warn(res.data)
            let temp = this.state.articles
            temp.push(data.article)
            this.setState({
              articles: temp
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
        "articleId": id
    }
    axios.post(constants["apiUrl"] + '/admin/deleteArticle', data)
    .then((res) => {
        let data = res.data;
        console.warn(res.data)
        let temp = this.state.articles.filter(article => article.id != id)
        this.setState({
            articles: temp
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

                                <div className="col text-right">
                                    <Button color="success" onClick={() => this.openAddModal()} size="sm">
                                        Add New Article
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
                                        <label for="message-text" class="col-form-label" defaultValue={this.state.desc}>Description:</label>
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
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.articles.map(article => {
												return (
													<tr>
														<th style={{width: 70}} scope="row">{article.name}</th>
														<td style={{ maxWidth: 150 }}>
                                <text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                    {article.description}
                                </text>
                            </td>
                            <td style={{width: 40}}>

                                <Link to={{
                                    pathname: '/admin/view/article/' + article.id,
                                }}>
                                    <Button color="primary" size="sm">
                                    View
                                    </Button>
                                </Link>
                            </td>
                            <td style={{width: 40}}>
                                <div className="col text-center">
                                    <Button color="danger" type="button"  size="sm"onClick={() => this.handleRemove(article.id)}>
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

export default SuperAdminViewStandards;
