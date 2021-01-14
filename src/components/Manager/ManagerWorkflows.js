/*! Developed by Alinon */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { constants } from '../../constants.js';
import routes from "routes.js";
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
	Modal,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Spinner,
	UncontrolledDropdown
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";

class ManagerWorkflows extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      addModal: false,
      assignModal: false,
      name: null,
      desc: null,
      workflows: [],
      users: [],
      index: null,
      username: 'Select User',
      assignId: null

    };
  }

  componentDidMount() {
		//Check if auth token in valid
		let userId = reactLocalStorage.get('userId', true);
		let clientId = reactLocalStorage.get('clientId', true);

		//console.warn('user ' + userId + 'client ' + clientId);

		if (clientId != null && userId != null) {
			const data = {
				"clientId": clientId,
			}
			axios.post(constants["apiUrl"] + '/workflows/getAll', data)
				.then((res) => {
					let data = res.data;
					console.warn(JSON.stringify(data));
					this.setState({
						workflows: data.workflows,
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

  openAssignModal = (id) => {
    this.setState({
      assignModal:true,
      index: id
    });

    let clientId = reactLocalStorage.get('clientId', true);

			//console.warn('user ' + userId + 'client ' + clientId);

			if (clientId != null ) {
				const data = {
					"clientId": clientId,
				}
				axios.post(constants["apiUrl"] + '/user/get', data)
					.then((res) => {
						let data = res.data;
						console.warn(JSON.stringify(data));
						this.setState({
							users: data.users,
						})
					})
					.catch((error) => {
						console.warn(JSON.stringify(error));
					});


  }
}

  closeAssignModal = () => {
    this.setState({
      assignModal:false
    })
  }

  handleSelect = (username, userId) => {
    this.setState({
      username: username,
      assignId: userId
    })

  }

  handleAssign = () => {

    console.warn(this.state.assignId)
    if (this.state.assignId != null) {
      const data = {
				"workflowId":this.state.index,
				"userId": this.state.assignId,
      }
      
      axios.post(constants["apiUrl"] + '/workflows/assign', data)
			.then((res) => {
				let data = res.data;
				console.warn(JSON.stringify(data));
				if (data.done == '1') {
					this.closeAssignModal();
				}
			})
			.catch((error) => {
				console.warn(JSON.stringify(error));
			});
    }
  }


  
  openAddModal = () => {
    this.setState({
      addModal:true
    });
  }

  closeAddModal = () => {
    this.setState({
      addModal: false,
      name: null,
      desc: null
    });
    
  }

  handleName = (event) => {
    this.setState({
      name : event.target.value
    })
  }

  handleDesc = (event) => {
    this.setState({
      desc: event.target.value
    })
  }

  handleAdd = () => {

    console.warn(this.state.desc)

    if (this.state.desc != null && this.state.name != null) {
      let clientId = reactLocalStorage.get('clientId', true);
      const data = {
        "clientId":clientId,
        "name": this.state.name,
        "description": this.state.desc
      }
      axios.post(constants["apiUrl"] + '/workflows/addWorkflow', data)
				.then((res) => {
					let data = res.data;
          console.warn(JSON.stringify(data));
          
					if (data.done == 1) {
            
            this.closeAddModal()
            
          }
          
          
				})
				.catch((error) => {
					console.warn(JSON.stringify(error));
				});
    }

  }

  removeAssign = (workflowId, userId) => {
    let clientId = reactLocalStorage.get('clientId', true);
      const data = {
        "workflowId": workflowId,
        "userId": userId
      }
      axios.post(constants["apiUrl"] + '/workflows/removeAssignment', data)
				.then((res) => {
					let data = res.data;
					console.warn(JSON.stringify(data));
					window.location.reload(false);
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
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Workflows</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href=""
                        onClick={() => this.openAddModal()}
                        size="sm"
                      >
                        Add Workflow
                      </Button>
                      <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.addModal}
                        defaultValue={this.state.addModal}
                        toggle={() => this.closeAddModal()}
                      >
                          <div className="modal-header">
                            <h2 className="modal-title" id="assignModelLabel">
                              
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
                                <label for="message-text" class="col-form-label" defaultValue={this.state.desc}>About:</label>
                                <textarea class="form-control" id="message-text" id = "message-text" onChange={this.handleDesc}></textarea>
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
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Description</th>
                      <th scope="col">Progress</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.workflows.map(workflow => {
                      return (
                        <tr>
                          <th scope = "row">
                          {workflow.name}
                          </th>
                          <td>
                          {workflow.user_id == null ? "-" : workflow.user.name}
                          </td>
                          <td>
                            -
                          </td>
                          <td>
                            {workflow.description}
                          </td>
                          <td>
                          <i className="fas fa-arrow-up text-success mr-3" />{" "}
                            {workflow.progress}%
                          </td>
                          <td>
                            <Link to={{
                                  pathname: '/manager/view/workflow/' + workflow.id,
                                  state: {
                                    name: "Food Quality 1.3"
                                  }
                                }}>
                                  <Button color="primary" size="sm">
                                    View
                                  </Button>
                            </Link>
                          </td>
                          <td>
                            {workflow.user_id == null ? 
                            
                            <Button color="success" onClick={() => this.openAssignModal(workflow.id)} size="sm">
																Assign
                            </Button>
                            :
                            <Button color="danger" onClick={() => this.removeAssign(workflow.id, workflow.user.id)} size="sm">
                            Remove
                            </Button>}
                            
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.assignModal}
                    defaultValue={this.state.index}
                    toggle={() => this.closeAssignModal()}
                  >
                    <div className="modal-header">
                      <h2 className="modal-title" id="assignModelLabel">
                        Workflow {this.state.index}
                      </h2>
                      <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.closeAssignModal()}
                      >
                        <span aria-hidden={true}>×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <Row className="justify-content-md-center">
                        <Col xl="auto">
                          {this.state.users != null ?
                            <UncontrolledDropdown>
                              <DropdownToggle caret>
                                {this.state.username}
                              </DropdownToggle>
                              <DropdownMenu container="body">
                                {this.state.users.map((user, index) => {
                                  return (
                                  <DropdownItem onClick={() => this.handleSelect(user.name, user.id)} key={index}>
                                    {user.name}
                                  </DropdownItem>
                                  )
                                })}
                              </DropdownMenu>
                            </UncontrolledDropdown>
                                                  
                            :
                            <div>Loading...</div>
                          }
                        </Col>
                      </Row>
                    </div>
                    <div className="modal-footer">
                      <Button color="secondary" data-dismiss="modal" type="button" onClick={() => this.closeAssignModal()}>
                        Cancel
                                    </Button>
                      <Button color="success" type="button" onClick={() => this.handleAssign()}>
                        Assign
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

export default ManagerWorkflows;
