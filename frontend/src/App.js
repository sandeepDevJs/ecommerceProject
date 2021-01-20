import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

export default function App() {
	return (
		<Router>
			<Header />
			<Container>
				<main className="py-3">
					<Route path="/" exact component={HomeScreen} />
					<Route path="/product/:slug" component={ProductScreen} />
					<Route path="/cart/:slug?" component={CartScreen} />
				</main>
			</Container>
			<Footer />
		</Router>
	);
}
