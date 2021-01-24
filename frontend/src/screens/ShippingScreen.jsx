import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import FromContainer from "../components/FromContainer";
import CheckOutStep from "../components/CheckOutStep";

const ShippingScree = ({ history }) => {
	const { shippingAddress } = useSelector((state) => state.shippingDetails);

	const [address, setAddress] = useState(shippingAddress.address);
	const [city, setCity] = useState(shippingAddress.city);
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
	const [country, setCountry] = useState(shippingAddress.country);

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		history.push("/payment");
	};
	return (
		<FromContainer>
			<CheckOutStep />
			<h1>Shipping</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Address"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter Postal Code"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					/>
				</Form.Group>
				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Continue
				</Button>
			</Form>
		</FromContainer>
	);
};

export default ShippingScree;
