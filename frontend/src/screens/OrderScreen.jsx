import React, { useEffect } from "react";
import { Row, Col, Image, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET } from "../constants/orderConstant";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = ({ match }) => {
	const dispatch = useDispatch();
	const { order, loading, error } = useSelector((state) => state.orderDetails);
	const { loading: payLoading, success: paySuccess } = useSelector(
		(state) => state.orderPay
	);

	useEffect(() => {
		if (paySuccess) {
			dispatch({ type: ORDER_PAY_RESET });
		}
		dispatch(getOrderDetails(match.params.id));
	}, [dispatch, match, paySuccess]);

	const payOrederHandler = () => {
		dispatch(payOrder(match.params.id));
	};

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<>
			<h1>Order</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								{" "}
								<strong>Name: </strong>
								{order.userId.name}{" "}
							</p>
							<p>
								{" "}
								<strong>Email: </strong>
								{order.userId.email}{" "}
							</p>
							<p>
								<strong>Address: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city},
								{order.shippingAddress.postalCode},
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Delivered At {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">Not Delivered!</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Message variant="success">Paid At {order.paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid!</Message>
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.products.length === 0 ? (
								<Message>Your Cart Is Empty</Message>
							) : (
								<ListGroup>
									{order.products.map((item, index) => {
										return (
											<ListGroup.Item key={index}>
												<Row>
													<Col md={1}>
														<Image
															src={item.productId.product_image}
															fluid
															rounded
														/>
													</Col>
													<Col>
														<Link to={`/product/${item.productId.slug}`}>
															{item.productId.title}
														</Link>
													</Col>
													<Col md={4}>
														{item.quantity} X ${item.productId.pricing.price} ={" "}
														${item.quantity * item.productId.pricing.price}
													</Col>
												</Row>
											</ListGroup.Item>
										);
									})}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items:</Col>
									<Col>${order.total}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax:</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total:</Col>
									<Col>${order.total}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{order.isPaid ? (
									<Button type="button" className="btn-block" disabled>
										Paid At {order.paidAt}
									</Button>
								) : payLoading ? (
									<Button type="button" className="btn-block">
										<Loader />
									</Button>
								) : (
									<Button
										type="button"
										className="btn-block"
										disabled={order.products.length === 0}
										onClick={payOrederHandler}
									>
										Pay
									</Button>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
