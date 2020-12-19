/*! Developed by Alinon */
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Modal,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import EmptyHeader from "components/Manager/Headers/EmptyHeader.js";
// import Roles from "./Popups/Roles.js"

class ManagerIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentModel: false,
      roleModel: false,
      toggleDropdown: false,
      thisname : ""
    };
    
  }

  name = this.props.location.state.name
  
  toggleModal = state => {
    console.log(state);
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {

    return (
      <>
        <EmptyHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          
          <Row className="mt-5 justify-content-center">
            <Col className="mb-5 mb-xl-0" xl="10">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">{this.name}</h3>
                    </div>

                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <th scope="row"> 
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Food Safety
                      </td>
                      <td>The Kitchen used to prepare the food should follow Health Standard 1.3</td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Customer Safety
                      </td>
                      <td>The Kitchen used to prepare the food should follow Health Standard 1.3</td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Health Guideline
                      </td>
                      <td>The Kitchen used to prepare the food should follow Health Standard 1.3</td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Food Standard
                      </td>
                      <td>The Food provided to the customer should be on standard of Food Legislation 1.0</td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Ingredients Standard
                      </td>
                      <td>The Ingredients should be on the standard provided in Food Legislation 1.0</td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Ingredients Quality
                      </td>
                      <td>The Ingredients used should be fresh and bought recently</td>
                    </tr>
                    
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
