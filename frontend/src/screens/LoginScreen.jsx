import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, FormGroup, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FromContainer from "../components/FromContainer";
import { login, forgotPassword } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
	const formRef = useRef();

	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Enter Valid Email!").required("Required!"),
		password: Yup.string()
			.max(15, "Password Must Be At Most 15 characters!")
			.min(8, "Password Must Be At Least 8 characters!")
			.required("Required!"),
	});

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const userForgotPassword = useSelector((state) => state.userForgotPassword);
	const {
		loading: forgotPassLoading,
		error: forgotPassError,
		success: forgotPassSuccess,
	} = userForgotPassword;

	useEffect(() => {
		if (userInfo) {
			history.push("/");
		}
	}, [history, userInfo]);

	const onSubmitHandler = (values) => {
		dispatch(login(values.email, values.password));
	};

	const forgotPasswordHandler = () => {
		if (formRef.current.errors.email) {
			alert("Enter Proper Email!, Then Hit Forgot Password");
		} else {
			dispatch(forgotPassword(formRef.current.values.email));
		}
	};

	return (
		<FromContainer>
			<h1>Sign In</h1>
			{(error || forgotPassError) && (
				<Message variant="danger">{error}</Message>
			)}
			{forgotPassSuccess && (
				<Message variant="success">Check Your Email!</Message>
			)}
			{(loading || forgotPassLoading) && <Loader />}
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmitHandler}
				innerRef={formRef}
			>
				<Form>
					<FormGroup controlId="email">
						<FormLabel>Email</FormLabel>
						<Field type="email" name="email">
							{(props) => {
								let { field } = props;
								return (
									<input
										placeholder="Enter Email"
										className="form-control"
										id="email"
										{...field}
									/>
								);
							}}
						</Field>
						<ErrorMessage name="email">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<FormGroup controlId="password">
						<FormLabel>Password</FormLabel>
						<Field
							type="password"
							className="form-control"
							name="password"
							placeholder="Enter Email"
						/>
						<ErrorMessage name="password">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<Button variant="primary" type="submit">
						Sign In
					</Button>
				</Form>
			</Formik>
			<Row className="py-3">
				<Col>
					New User ? <Link to={`/register`}>Register</Link>
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
