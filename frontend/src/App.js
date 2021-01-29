import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
	return (
		<Router>
			<Header />
			<Container>
				<main className="py-3">
					<PrivateRoute path="/shipping" component={ShippingScreen} />
					<PrivateRoute path="/order/:id" component={OrderScreen} />
					<PrivateRoute path="/payment" component={PaymentScreen} />
					<PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/resetPassword/:token" component={ResetPasswordScreen} />
					<Route path="/register" component={RegisterScreen} />
					<PrivateRoute path="/profile" component={ProfileScreen} />
					<Route path="/product/:slug" component={ProductScreen} />
					<PrivateRoute path="/cart" component={CartScreen} />
					<Route path="/search/:keyword" component={HomeScreen} exact />
					<Route path="/page/:page" component={HomeScreen} exact />
					<Route
						path="/search/:keyword/page/:page"
						exact
						component={HomeScreen}
					/>
					<Route path="/" exact component={HomeScreen} />
				</main>
			</Container>
			<Footer />
		</Router>
	);
}
