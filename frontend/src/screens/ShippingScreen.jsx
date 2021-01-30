import React from "react";
import { FormGroup, FormLabel, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import FromContainer from "../components/FromContainer";
import CheckOutStep from "../components/CheckOutStep";
import Message from "../components/Message";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ShippingScree = ({ history }) => {
	const { shippingAddress } = useSelector((state) => state.shippingDetails);

	const initialValues = {
		address: shippingAddress.address,
		city: shippingAddress.city,
		postalCode: shippingAddress.postalCode,
		country: shippingAddress.country,
	};

	const validationSchema = Yup.object({
		address: Yup.string()
			.min(4, "Address Must Be At Least 4 Characters Long!")
			.max(10, "Address Must Be At Most 10 Characters Long!")
			.required("Required!"),
		city: Yup.string()
			.min(4, "City Must Be At Least 4 Characters Long!")
			.max(10, "City Must Be At Most 10 Characters Long!")
			.required("Required!"),
		postalCode: Yup.string()
			.matches(/^[0-9]{6}$/, "Must be exactly 5 digits")
			.required("Required!"),
		country: Yup.string()
			.min(3, "Country Name Must Be At Least 3 Characters Long!")
			.max(20, "Country Name Must Be At Most 20 Characters Long!")
			.required("Required!"),
	});

	const dispatch = useDispatch();

	const onSubmitHandler = (values) => {
		dispatch(
			saveShippingAddress({
				address: values.address,
				city: values.city,
				postalCode: values.postalCode,
				country: values.country,
			})
		);
		history.push("/payment");
	};
	return (
		<FromContainer>
			<CheckOutStep />
			<h1>Shipping</h1>
			<Formik
				onSubmit={onSubmitHandler}
				initialValues={initialValues}
				validationSchema={validationSchema}
			>
				<Form>
					<FormGroup controlId="address">
						<FormLabel>Address</FormLabel>
						<Field
							type="text"
							placeholder="Enter Address"
							name="address"
							className="form-control"
						/>
						<ErrorMessage name="address">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<FormGroup controlId="city">
						<FormLabel>City</FormLabel>
						<Field
							type="text"
							placeholder="Enter Address"
							className="form-control"
							name="city"
						/>
						<ErrorMessage name="city">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<FormGroup controlId="postalCode">
						<FormLabel>Postal Code</FormLabel>
						<Field
							type="number"
							placeholder="Enter Postal Code"
							name="postalCode"
							className="form-control"
						/>
						<ErrorMessage name="postalcode">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<FormGroup controlId="country">
						<FormLabel>Country</FormLabel>
						<Field
							type="text"
							placeholder="Enter Country"
							name="country"
							className="form-control"
						/>
						<ErrorMessage name="country">
							{(errMsg) => <Message variant="danger">{errMsg}</Message>}
						</ErrorMessage>
					</FormGroup>
					<Button variant="primary" type="submit">
						Continue
					</Button>
				</Form>
			</Formik>
		</FromContainer>
	);
};

export default ShippingScree;
