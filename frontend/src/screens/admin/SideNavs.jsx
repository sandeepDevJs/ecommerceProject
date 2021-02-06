import React from "react";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SideNavs = () => {
	return (
		<div>
			<Navbar
				style={{
					backgroundColor: "#f6f6f6",
					borderRight: "2px solid black",
				}}
			>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-admin-navbar-nav"></Navbar.Collapse>
				<Nav className="flex-column">
					<Nav.Item>
						<LinkContainer exact to="/admin">
							<Nav.Link>
								<i className="fas fa-tachometer-alt px-3"></i>
								<br />
								Dashboard
							</Nav.Link>
						</LinkContainer>
					</Nav.Item>
					<Nav.Item>
						<LinkContainer exact to="/admin/users">
							<Nav.Link>
								<i className="fas fa-users px-3"></i> <br />
								Users
							</Nav.Link>
						</LinkContainer>
					</Nav.Item>

					<Nav.Item>
						<LinkContainer exact to="/admin/products">
							<Nav.Link>
								<i className="fas fa-store-alt px-3"></i>
								<br />
								Products
							</Nav.Link>
						</LinkContainer>
					</Nav.Item>

					<Nav.Item>
						<LinkContainer exact to="/admin/categories/">
							<Nav.Link>
								<i className="fas fa-list-alt px-3"></i>
								<br />
								Categories
							</Nav.Link>
						</LinkContainer>
					</Nav.Item>

					<Nav.Item>
						<LinkContainer exact to="/admin/subcategories">
							<Nav.Link>
								<i className="fas fa-list-alt px-3"></i>
								<br />
								Subcategories
							</Nav.Link>
						</LinkContainer>
					</Nav.Item>

					<Nav.Item>
						<LinkContainer exact to="/admin/orders">
							<Nav.Link>
								<i className="fas fa-clipboard px-3"></i>
								<br />
								Orders
							</Nav.Link>
						</LinkContainer>
					</Nav.Item>
				</Nav>
			</Navbar>
		</div>
	);
};

export default SideNavs;
