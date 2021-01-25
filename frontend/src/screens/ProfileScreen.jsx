import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = ({ history }) => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

	useEffect(() => {
		if (!user.name) {
			dispatch(getUserDetails());
		} else {
			setName(user.name);
			setEmail(user.email);
			setAddress(user.address);
		}
	}, [dispatch, user]);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		let data = {
			name,
			email,
			address,
		};
		dispatch(updateUserProfile(data));
	};

	return (
		<Row>
			<Col md={3}>
				<h2>Profile</h2>
				{error && <Message variant="danger">{error}</Message>}
				{userUpdateProfile.success && (
					<Message variant="success">Profile Updated</Message>
				)}
				{userUpdateProfile.error && (
					<Message variant="danger">{userUpdateProfile.error}</Message>
				)}
				{loading && <Loader />}
				<Form onSubmit={onSubmitHandler}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Cart</h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
