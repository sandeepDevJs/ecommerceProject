import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../../contexts/cartContext";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import CartProduct from "../../components/CartProduct";
import { listCart } from "../../actions/cartAction";

const CartScreen = () => {
	const cartData = useContext(CartContext);
	const dispatch = useDispatch();

	const { loading, cart, error } = cartData;

	useEffect(() => {
		dispatch(listCart());
	}, [dispatch]);

	return (
		<>
			{loading && <Loader />}
			{error ? (
				<Message variant="danger">{error}</Message>
			) : cart ? (
				<Row>
					<Col md={8}>
						<h1>Shopping Cart</h1>
						{cart.products.length === 0 ? (
							<Message>
								Your Cart Is Empty!!, <Link to="/">Click Here To Go Back</Link>{" "}
							</Message>
						) : (
							<ListGroup variant="flush">
								{cart.products.map((item) => (
									<CartProduct key={item.productId._id} item={item} />
								))}
							</ListGroup>
						)}
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>
										Subtotal{" "}
										{cart.products.reduce(
											(acc, item) => acc + item.quantity,
											0
										)}{" "}
										items
									</h2>
									${cart.total}
								</ListGroup.Item>
								<ListGroup.Item>
									<LinkContainer to="/shipping">
										<Button
											type="button"
											className="btn-block"
											disabled={cart.products.length === 0}
										>
											Proceed To CheckOut
										</Button>
									</LinkContainer>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			) : (
				""
			)}
		</>
	);
};

export default CartScreen;
