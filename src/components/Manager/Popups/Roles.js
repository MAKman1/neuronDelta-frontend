/*! Developed by Alinon */
import React from "react";

import {
    Button,
    Modal,
  } from "reactstrap";

class Roles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documentModel: false
        };
    }
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    render() {
        return (
            <Modal
                className="modal-dialog-centered"
                isOpen={this.state.documentModel}
                toggle={() => this.toggleModal("documentModel")}
            >
                <div className="modal-header">
                    <h2 className="modal-title" id="documentModelLabel">
                        Add Document
                          </h2>
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("documentModel")}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="recipient-name" class="col-form-label">Name:</label>
                            <input type="text" class="form-control" id="recipient-name"></input>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label">Description:</label>
                            <textarea class="form-control" id="message-text"></textarea>
                        </div>
                        <div className="align-items-center">
                            <Button color="primary" type="button">
                                Choose File
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => this.toggleModal("documentModel")}
                    >
                        Cancel
                          </Button>
                    <Button color="success" type="button">
                        Upload
                          </Button>
                </div>
            </Modal>
        );
    }
}

export default Roles;