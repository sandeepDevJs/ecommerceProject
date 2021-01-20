import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartContext } from "../../contexts/cartContext";
import { Row, Col, ListGroup } from "react-bootstrap";
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
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
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
					<Col md={10}></Col>
					<Col md={2}></Col>
				</Row>
			)}
		</>
	);
};

export default CartScreen;
