import React from "react";
import { Button, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import FromContainer from "../components/FromContainer";
import CheckOutStep from "../components/CheckOutStep";
import Message from "../components/Message";

const PlaceOrderScreen = ({ history }) => {
	const shippingDetails = useSelector((state) => state.shippingDetails);

	if (!shippingDetails.paymentMethod) {
		history.push("/payment");
	}

	const addDecimal = (num) => {
		return parseInt(Math.round(num * 100) / 100).toFixed(2);
	};

	const { cart } = useSelector((state) => state.cartList);
	cart.shippingPrice = addDecimal(cart.total > 100 ? 0 : 10);
	cart.taxPrice = addDecimal(0.18 * cart.total);

	cart.totalPrice =
		parseInt(cart.total) +
		parseInt(cart.shippingPrice) +
		parseInt(cart.taxPrice);

	return (
		<>
			<CheckOutStep activeStep={2} />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{shippingDetails.shippingAddress.address},{" "}
								{shippingDetails.shippingAddress.city},
								{shippingDetails.shippingAddress.postalCode},
								{shippingDetails.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{shippingDetails.paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.products.length === 0 ? (
								<Message>Your Cart Is Empty</Message>
							) : (
								<ListGroup>
									{cart.products.map((item, index) => {
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
									<Col>${cart.total}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax:</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total:</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="bt-block"
									disabled={cart.total <= 0}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
