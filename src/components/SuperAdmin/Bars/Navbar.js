/*! Developed by Alinon */
import React from "react";
import { Link } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
// reactstrap components
import {
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Form,
	FormGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	InputGroup,
	Navbar,
	Nav,
	Container,
	Media
} from "reactstrap";

class AdminNavbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			profileImage: null
		};
	}


	componentDidMount() {
		let user = reactLocalStorage.getObject('currentUser', true);
		if (user != null) {
			this.setState({
				userName: "" + user.name,
				profileImage: user.profile_image
			});
		}
	}

	logout = () => {
		reactLocalStorage.clear();
		this.props.history.push("/login");
	}

	render() {
		return (
			<>
				<Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
					<Container fluid>
						<Link
							className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
							to="/"
						>
							{this.props.brandText}
						</Link>
						<Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
							<FormGroup className="mb-0">
								<InputGroup className="input-group-alternative">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="fas fa-search" />
										</InputGroupText>
									</InputGroupAddon>
									<Input placeholder="Search Admin" type="text" />
								</InputGroup>
							</FormGroup>
						</Form>
						<Nav className="align-items-center d-none d-md-flex" navbar>
							<UncontrolledDropdown nav>
								<DropdownToggle className="pr-0" nav>
									<Media className="align-items-center">
										<span className="avatar avatar-sm rounded-circle">
											{this.state.profileImage === null ?
												<img
													alt="..."
													className="rounded-circle"
													src={require("assets/img/default/defaultProfile.png")}
												/>
												:
												<img
													alt="..."
													className="rounded-circle"
													src={require("assets/img/default/defaultProfile.jpg")}
												/>
											}
										</span>
										<Media className="ml-2 d-none d-lg-block">
											<span className="mb-0 text-sm font-weight-bold">
												{this.state.userName}
											</span>
										</Media>
									</Media>
								</DropdownToggle>
								<DropdownMenu className="dropdown-menu-arrow" right>
									<DropdownItem className="noti-title" header tag="div">
										<h6 className="text-overflow m-0">Welcome!</h6>
									</DropdownItem>
									<DropdownItem to="/master/profile" tag={Link}>
										<i className="ni ni-single-02" />
										<span>My profile</span>
									</DropdownItem>
									<DropdownItem to="/master/index" tag={Link}>
										<i className="ni ni-settings-gear-65" />
										<span>Settings</span>
									</DropdownItem>


									<DropdownItem divider />
									<DropdownItem href="" onClick={this.logout}>
										<i className="ni ni-user-run" />
										<span>Logout</span>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Container>
				</Navbar>
			</>
		);
	}
}

export default AdminNavbar;
