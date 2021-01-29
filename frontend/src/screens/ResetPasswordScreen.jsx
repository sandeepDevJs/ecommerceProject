import React, { useEffect } from "react";
import { Button, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FromContainer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../actions/userActions";
import {
	USER_RESET_PASS_RESET,
	USER_FORGOT_PASS_RESET,
} from "../constants/userConstants";

const initialValues = {
	pass: "",
	confirmPass: "",
};

const validationSchema = Yup.object({
	pass: Yup.string()
		.max(15, "Password Must Be At Most 15 characters!")
		.min(8, "Password Must Be At At Least 8 characters!")
		.required("Required!"),
	confirmPass: Yup.string()
		.oneOf([Yup.ref("pass"), null], "Password Didn't Match!")
		.required("Required!"),
});

const ResetPasswordScreen = ({ match, history }) => {
	let token = match.params.token;

	const userResetPassword = useSelector((state) => state.userResetPassword);
	const { loading, error, success } = userResetPassword;

	const dispatch = useDispatch();

	const onSubmit = (values) => {
		dispatch(resetPassword(token, values.pass));
	};

	useEffect(() => {
		if (success) {
			dispatch({ type: USER_RESET_PASS_RESET });
			dispatch({ type: USER_FORGOT_PASS_RESET });
			history.push("/login");
		}
	}, [dispatch, history, success]);

	return (
		<FormContainer>
			<h1>Forgot Password</h1>
			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				<Form>
					<FormGroup controlId="password">
						<Field
							className="form-control"
							placeholder="Enter New Password Here...."
							type="password"
							name="pass"
						/>
						<ErrorMessage name="pass">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<FormGroup controlId="Confirm Password">
						<Field
							className="form-control"
							type="password"
							name="confirmPass"
							placeholder="Re-Enter New Password Here...."
						/>
						<ErrorMessage name="confirmPass">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Formik>
		</FormContainer>
	);
};

export default ResetPasswordScreen;
