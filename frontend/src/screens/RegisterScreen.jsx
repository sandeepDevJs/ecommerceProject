import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FormLabel, FormGroup, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FromContainer from "../components/FromContainer";
import { register } from "../actions/userActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterScreen = ({ location, history }) => {
	const initialValues = {
		name: "",
		email: "",
		password: "",
		address: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Required!"),
		email: Yup.string().email().required(),
		password: Yup.string()
			.max(15, "Password Must Be At Most 15 characters!")
			.min(8, "Password Must Be At Least 8 characters!")
			.required("Required!"),
		address: Yup.string()
			.min(10, "Address Must Be At Least 10 Characters Long!")
			.max(20, "Address Must Be At Most 20 Characters Long!")
			.required("Required!"),
	});

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

	const onSubmitHandler = (values) => {
		let data = {
			name: values.name,
			email: values.email,
			password: values.password,
			address: values.address,
		};
		dispatch(register(data));
	};

	return (
		<FromContainer>
			<h1>Sign Up</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Formik
				onSubmit={onSubmitHandler}
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				<Form>
					<FormGroup controlId="name">
						<FormLabel>Name</FormLabel>
						<Field
							type="text"
							className="form-control"
							placeholder="Enter Name"
							name="name"
						/>
						<ErrorMessage name="name">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<FormGroup controlId="email">
						<FormLabel>Email</FormLabel>
						<Field
							type="email"
							className="form-control"
							placeholder="Enter Email"
							name="email"
						/>
						<ErrorMessage name="email">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<FormGroup controlId="password">
						<FormLabel>Password</FormLabel>
						<Field
							type="password"
							className="form-control"
							placeholder="Enter Password.."
							name="password"
						/>
						<ErrorMessage name="password">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<FormGroup controlId="address">
						<FormLabel>Address</FormLabel>
						<Field
							type="text"
							className="form-control"
							placeholder="Enter Address"
							name="address"
						/>
						<ErrorMessage name="address">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<Button variant="primary" type="submit">
						Sign Up
					</Button>
				</Form>
			</Formik>
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
