import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartAction";
import FromContainer from "../components/FromContainer";
import CheckOutStep from "../components/CheckOutStep";

const PaymentScreen = ({ history }) => {
	const { shippingAddress } = useSelector((state) => state.shippingDetails);

	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push("/placeorder");
	};

	useEffect(() => {
		if (!shippingAddress) {
			history.push("/shipping");
		}
	}, [history, shippingAddress]);

	return (
		<FromContainer>
			<CheckOutStep activeStep={1} />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethod"
							value="Paypal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>

						{/* <Form.Check
							type="radio"
							label="Stripe"
							id="Stripe"
							name="paymentMethod"
							value="Stripe"
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check> */}
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					Continue
				</Button>
			</Form>
		</FromContainer>
	);
};

export default PaymentScreen;
