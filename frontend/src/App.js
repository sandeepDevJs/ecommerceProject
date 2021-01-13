import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

export default function App() {
	return (
		<>
			<Header />
			<Container>
				<main className="py-3">
					<h1>Shop</h1>
				</main>
			</Container>
			<Footer />
		</>
	);
}
