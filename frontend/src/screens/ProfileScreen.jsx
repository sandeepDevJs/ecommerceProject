import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrder } from "../actions/orderActions";
import { USER_PROFILE_UPDATE_RESET } from "../constants/userConstants";

const ProfileScreen = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

	useEffect(() => {
		if (!user || userUpdateProfile.success) {
			dispatch({ type: USER_PROFILE_UPDATE_RESET });
			dispatch(getUserDetails());
			dispatch(listMyOrder());
		} else {
			setName(user.name);
			setEmail(user.email);
		}
	}, [dispatch, user, userUpdateProfile]);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		let data = {
			name,
			email,
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
					<Button variant="primary" type="submit">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Cart</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table stripped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.total}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}>
												{order.isPaid}
											</i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										{" "}
										<LinkContainer to={`order/${order._id}`}>
											<Button className="btn-sm" variant="light">
												Details
											</Button>
										</LinkContainer>{" "}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
