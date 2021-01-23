/*! Developed by Alinon */
import React, { version } from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';

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

class SuperAdminStandards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      standards: [],
      loading: false,
      addModal: false,
      name: null,
      desc: null,
      version: null,
      index: null,
      editModal: false,
    };
  }

  componentDidMount() {
    axios.post(constants["apiUrl"] + '/admin/getStandards')
      .then((res) => {
        let data = res.data;
        this.setState({
          standards: data.standards,
          loading: false
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
      description: null,
      version: null,
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

  handleVersion = (event) => {
    this.setState({
      version: event.target.value
    })
    
  }

  handleAdd = () => {

    if (this.state.name != null && this.state.desc != null & this.state.version != null) {
      const data = {
        "name": this.state.name,
        "description": this.state.desc,
        "version": this.state.version
      }
      axios.post(constants["apiUrl"] + '/admin/addStandard', data)
        .then((res) => {
          let data = res.data;
          console.warn(res.data)
          let temp = this.state.standards
          temp.push(data.standard)
          this.setState({
            standards: temp,
          })
          this.closeAddModal()
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }
    
    
  }

  handleRemove = (id) => {
    const data = {
      "standardId" : id
    }
    axios.post(constants["apiUrl"] + '/admin/deleteStandard', data)
        .then((res) => {
          let data = res.data;
          console.warn(res.data)
          if (data.done == 1) {
            let temp = this.state.standards.filter(standard => standard.id != id)
            this.setState({
              standards: temp
            })
            this.forceUpdate()
          }
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
  }

  openEditModal = (id) => {
    let temp = this.state.standards.filter(standard => standard.id == id)
    this.setState({
      index: temp[0].id,
      name: temp[0].name,
      desc: temp[0].description,
      version: temp[0].version,
      editModal: true,
    })

    this.forceUpdate()
  }

  closeEditModal = () => {
    this.setState({
      name: null,
      desc: null,
      version: null,
      editModal: false
    })
  }

  handleEdit = () => {
    const data = {
      "name": this.state.name,
      "description": this.state.desc,
      "version": this.state.version,
      "standardId": this.state.index,
    }

    axios.post(constants["apiUrl"] + '/admin/editStandard', data)
        .then((res) => {
          let data = res.data;
          console.warn(res.data)
          let index = this.state.standards.findIndex(standard => standard.id == data.standard.id)
          let temp = this.state.standards
          temp[index].name = data.standard.name
          temp[index].description = data.standard.description
          temp[index].version = data.standard.version
          this.setState({
            standards: temp
          })
          this.forceUpdate()
          this.closeEditModal()
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
          <Row className="mt-5">
            <Col xl>
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Current Standards</h3>
                    </div>
                    <div className="col text-right">
                      <Button color="success" onClick={() => this.openAddModal()} size="md">
                        Add Standard
                      </Button>
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
                        <th scope="col">Article Count</th>
                        <th scope="col">Description</th>
                        <th scope="col">Version</th>
                        <th scope="col"></th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.standards.map((standard, index) => {
                        return (
                          <tr key={index}>
                            <th style={{width: 80}} scope="row">
                              {standard.name}
                            </th>
                            <td className="col text-center" style={{width: 30}}>
                              {standard.articleCount ? standard.articleCount : "-"}
                            </td>
                            <td style={{ maxWidth: 150 }}>
                              <text style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                {standard.description ? standard.description : '-'}
                              </text>
                            </td>
                            <td style={{width: 30}}>
                              {standard.version}
                            </td>
                            <td style={{width: 40}}>
                              <Link to={{
                                pathname: '/master/view/standard/' + standard.id,
                              }}>
                                <Button color="primary" size="sm">
                                  View
                                </Button>
                              </Link>
                              <Button style={{marginLeft:10}} color="primary" size="sm" onClick={() => this.openEditModal(standard.id)}>
                                  Edit
                              </Button>
                              <Button color="danger" size="sm" onClick={() => this.handleRemove(standard.id)}>
                                Delete
                              </Button>
                              </td>
                          </tr>
                        )
                      })}

                    </tbody>
                  </Table>
                }
              </Card>
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
                    <div className="form-group">
                      <label for="recipient-version" defaultValue={this.state.version} class="col-form-label" >Version</label>
                      <input type="number" class="form-control" id="recipient-version" onChange={this.handleVersion}></input>
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
              <Modal
                className="modal-dialog-centered"
                isOpen={this.state.editModal}
                defaultValue={this.state.editModal}
                toggle={() => this.EditAddModal()}
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
                    onClick={() => this.closeEditModal()}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label for="recipient-name" defaultValue={this.state.name} class="col-form-label" >Name:</label>
                      <input type="text" class="form-control" id="recipient-name" value={this.state.name} onChange={this.handleName}></input>
                    </div>
                    <div class="form-group">
                      <label for="message-text" class="col-form-label" defaultValue={this.state.desc}>Description:</label>
                      <textarea class="form-control" id="message-text" value={this.state.desc} id="message-text" onChange={this.handleDesc}></textarea>
                    </div>
                    <div className="form-group">
                      <label for="recipient-version" defaultValue={this.state.version} class="col-form-label" >Version</label>
                      <input type="number" class="form-control" value = {this.state.version} id="recipient-version" onChange={this.handleVersion}></input>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.closeEditModal()}>
                    Cancel
                                                </Button>
                  <Button color="success" type="button" onClick={() => this.handleEdit()}>
                    Save
                                                </Button>
                </div>
              </Modal>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default SuperAdminStandards;
