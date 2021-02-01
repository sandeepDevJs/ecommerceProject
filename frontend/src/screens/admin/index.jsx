import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserListScreen from "./UserListScreen";
import OrderDetailsScreen from "./OrderDetails";
import SingleOrderDetailsScreen from "./SingleOrderDetails";
import ProductListScreen from "./ProductListScreen";
import SideNavs from "./SideNavs";
import { Row, Col } from "react-bootstrap";

const AdminScreens = () => {
	return (
		<Router>
			<Row>
				<Col md={2}>
					<SideNavs />
				</Col>
				<Col md={10}>
					<Container>
						<Route exact path="/admin" render={() => <h1>Home</h1>} />
						<Route exact path="/admin/users" component={UserListScreen} />
						<Route
							exact
							path="/admin/users/usersOrderList/:userId"
							component={OrderDetailsScreen}
						/>
						<Route
							exact
							path="/admin/OrderDetails/:orderId"
							component={SingleOrderDetailsScreen}
						/>
						<Route exact path="/admin/products" component={ProductListScreen} />
					</Container>
				</Col>
			</Row>
		</Router>
	);
};

export default AdminScreens;
