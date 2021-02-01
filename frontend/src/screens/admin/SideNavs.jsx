import React from "react";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SideNavs = () => {
	return (
		<div>
			<Navbar
				style={{
					backgroundColor: "#f6f6f6",
				}}
			>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-admin-navbar-nav"></Navbar.Collapse>
				<Nav className="flex-column">
					<Nav.Item>
						<LinkContainer exact to="/admin">
							<Nav.Link>
								<i className="fas fa-tachometer-alt px-3"></i>
								Dashboard
							</Nav.Link>
						</LinkContainer>
						<Dropdown.Divider />
					</Nav.Item>
					<Nav.Item>
						<LinkContainer exact to="/admin/users">
							<Nav.Link>
								<i className="fas fa-users px-3"></i>
								Users
							</Nav.Link>
						</LinkContainer>
						<Dropdown.Divider />
					</Nav.Item>

					<Nav.Item>
						<LinkContainer exact to="/admin/products">
							<Nav.Link>
								<i className="fas fa-store-alt px-3"></i>
								Products
							</Nav.Link>
						</LinkContainer>
						<Dropdown.Divider />
					</Nav.Item>

					<Nav.Item>
						<LinkContainer exact to="/admin/k">
							<Nav.Link>Active</Nav.Link>
						</LinkContainer>
					</Nav.Item>
				</Nav>
			</Navbar>
		</div>
	);
};

export default SideNavs;
