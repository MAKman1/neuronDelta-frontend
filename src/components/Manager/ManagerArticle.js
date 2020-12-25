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
  Col,
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
      check1: 1,
      check2: 0,
      check3: 0,
      check4: 1,
      check5: 1,
      check6: 0
    };
    
  }

 



  
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
            <Col className="mb-5 mb-xl-0" xl="12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">{this.name}</h3>
                    </div>
                    <div className="col text-right">

                    </div>

                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <th scope="row"> 
                      <div class="form-check">
                      <input class="form-check-input" style={{width: 17, height: 17 }}type="checkbox" defaultChecked id="Check1"/>
                        <label class="form-check-label " for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Food Safety
                      </td>
                      <td>The Kitchen used to prepare the food should follow Health Standard 1.3</td>
                      <td>
                      {this.state.check1 === 1 && <Button color="success" size="sm"> Add Document </Button>}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check">
                      <input class="form-check-input"  style={{width: 17, height: 17 }}type="checkbox" value="0" id="Check2"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Customer Safety
                      </td>
                      <td>The Kitchen used to prepare the food should follow Health Standard 1.3</td>
                      <td>
                      {this.state.check2 === 1 && <Button color="success" size="sm"> Add Document </Button>}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check">
                        <input class="form-check-input"  style={{width: 17, height: 17 }}type="checkbox" value="0" id="Check3"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Health Guideline
                      </td>
                      <td>The Kitchen used to prepare the food should follow Health Standard 1.3.<br/>The utensils should be disinfected every 2 hours according to the Virus Measure 1.9.<br/> The utensils in the cooking and serving should follow Health Standard 1.5 and 1.6</td>
                      <td>
                      {this.state.check3 === 1 && <Button color="success" size="sm"> Add Document </Button>}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check">
                      <input class="form-check-input" checked="true" style={{width: 17, height: 17 }}type="checkbox" value="1" id="Check4"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Food Standard
                      </td>
                      <td>The Food provided to the customer should be on standard of Food Legislation 1.0</td>
                      <td>
                      {this.state.check4 === 1 && <Button color="success" size="sm"> Add Document </Button>}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check">
                      <input class="form-check-input" checked="true" style={{width: 17, height: 17 }}type="checkbox" value="1" id="Check5"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Ingredients Standard
                      </td>
                      <td>The Ingredients should be on the standard provided in Food Legislation 1.0</td>
                      <td>
                      {this.state.check5 === 1 && <Button color="success" size="sm"> Add Document </Button>}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"> 
                      <div class="form-check"> 
                      <input class="form-check-input"  style={{width: 17, height: 17 }}type="checkbox" value="0" id="Check6"/>
                        <label class="form-check-label" for="defaultCheck1">
                            
                        </label>
                        </div>
                      </th>
                      <td>
                        Ingredients Quality
                      </td>
                      <td>The Ingredients used should be fresh and bought recently</td>
                      <td>
                      {this.state.check6 === 1 && <Button color="success" size="sm"> Add Document </Button>}
                      </td>
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
