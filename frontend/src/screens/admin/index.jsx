import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserListScreen from "./UserListScreen";
import SideNavs from "./SideNavs";
import { Row, Col } from "react-bootstrap";

const AdminScreens = () => {
	return (
		<Router>
			<Row>
				<Col md={3}>
					<SideNavs />
				</Col>
				<Col md={9}>
					<Container>
						<Route exact path="/admin" render={() => <h1>Home</h1>} />
						<Route exact path="/admin/users" component={UserListScreen} />
						{/* <Route exact path="/admin/dashboard" component={DashboardScreen} /> */}
					</Container>
				</Col>
			</Row>
		</Router>
	);
};

export default AdminScreens;
