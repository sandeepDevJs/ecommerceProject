import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FromContainer from "../components/FromContainer";
import { login, forgotPassword } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const userForgotPassword = useSelector((state) => state.userForgotPassword);
	const {
		loading: forgotPassLoading,
		error: forgotPassError,
		success: forgotPassSuccess,
	} = userForgotPassword;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	const forgotPasswordHandler = () => {
		if (!email.trim()) {
			alert("Enter Email!, Then Hit Forgot Password");
		} else {
			dispatch(forgotPassword(email));
		}
	};

	return (
		<FromContainer>
			<h1>Sign In</h1>
			{(error || forgotPassError) && (
				<Message variant="danger">{error}</Message>
			)}
			{forgotPassSuccess && (
				<Message variant="success">Check Your Email For!</Message>
			)}
			{(loading || forgotPassLoading) && <Loader />}
			<Form onSubmit={onSubmitHandler}>
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
				<Button variant="primary" type="submit">
					Sign In
				</Button>
			</Form>
			<Row className="py-3">
				<Col>
					New User ?{" "}
					<Link
						to={
							redirect !== "/" ? `/register?redirect=${redirect}` : "/register"
						}
					>
						Register
					</Link>
				</Col>
			</Row>
			<Row className="py-3">
				<Col>
					<p
						style={{ textDecoration: "underline", cursor: "pointer" }}
						onClick={forgotPasswordHandler}
					>
						Forgot Password?
					</p>
				</Col>
			</Row>
		</FromContainer>
	);
};

export default LoginScreen;
