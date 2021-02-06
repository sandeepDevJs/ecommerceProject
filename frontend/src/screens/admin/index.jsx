import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserListScreen from "./UserListScreen";
import DashboardScreen from "./DashboardScreen";
import OrderDetailsScreen from "./OrderDetails";
import SingleOrderDetailsScreen from "./SingleOrderDetails";
import ProductListScreen from "./ProductListScreen";
import ProductUpdateScreen from "./ProductUpdateScreen";
import ProductCreateScreen from "./ProductCreateScreen";
import CategoryListScreen from "./CategoryListScreen";
import SubcategoryListScreen from "./SubcategoryListScreen";
import OrderListScreen from "./OrderListScreen";
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
						<Route exact path="/admin" component={DashboardScreen} />
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
						<Route
							exact
							path="/admin/products/edit/:slug"
							component={ProductUpdateScreen}
						/>
						<Route
							exact
							path="/admin/products/create/"
							component={ProductCreateScreen}
						/>
						<Route
							exact
							path="/admin/categories"
							component={CategoryListScreen}
						/>

						<Route
							exact
							path="/admin/subcategories"
							component={SubcategoryListScreen}
						/>
						<Route exact path="/admin/orders" component={OrderListScreen} />
					</Container>
				</Col>
			</Row>
		</Router>
	);
};

export default AdminScreens;
