import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
	return (
		<>
			<Header />
			<Container>
				<main className="py-3">
					<HomeScreen />
				</main>
			</Container>
			<Footer />
		</>
	);
}
