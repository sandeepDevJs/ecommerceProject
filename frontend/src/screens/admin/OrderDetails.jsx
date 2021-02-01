import React, { useEffect } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderDetailsListById } from "../../actions/admin/userActions";
const OrderDetails = ({ match }) => {
	const userId = match.params.userId;

	const dispatch = useDispatch();

	const { loading, data: orders, error } = useSelector(
		(state) => state.adminGetAllOrderDetailsByUserId
	);

	useEffect(() => {
		dispatch(getAllOrderDetailsListById(userId));
	}, [dispatch, userId]);

	console.log(orders);

	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : orders ? (
				<>
					<h2> {`${orders[0].userId.name}'s`} Order Details</h2>
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
										<LinkContainer to={`../../OrderDetails/${order._id}`}>
											<Button className="btn-sm" variant="light">
												Details
											</Button>
										</LinkContainer>{" "}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			) : (
				""
			)}
		</div>
	);
};

export default OrderDetails;
