import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FromContainer from "../components/FromContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error } = userRegister;

	const userLoginInfo = useSelector((state) => state.userLogin);

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userLoginInfo.userInfo) {
			history.push(redirect);
		}
	}, [history, userLoginInfo, redirect]);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		let data = {
			name,
			email,
			password,
			address,
		};
		dispatch(register(data));
	};

	return (
		<FromContainer>
			<h1>Sign Up</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={onSubmitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter Email"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="textarea"
						placeholder="Enter Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Sign Up
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					Already A User ?{" "}
					<Link
						to={redirect !== "/" ? `/login?redirect=${redirect}` : "/login"}
					>
						Login
					</Link>
				</Col>
			</Row>
		</FromContainer>
	);
};

export default RegisterScreen;
