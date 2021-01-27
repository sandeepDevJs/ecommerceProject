import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartContext } from "../../contexts/cartContext";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import CartProduct from "../../components/CartProduct";
import { listCart } from "../../actions/cartAction";
import {
	CART_INCREMENT_ITEM_RESET,
	CART_REMOVE_ITEM_RESET,
} from "../../constants/cartConstant";

const CartScreen = () => {
	const cartData = useContext(CartContext);
	const dispatch = useDispatch();

	const {
		loading: cartIncrementLoading,
		success: cartIncrementSuccess,
		error: cartIncrementError,
	} = useSelector((state) => state.incrementCart);

	const {
		loading: cartRemoveLoading,
		isRemoved,
		error: cartRemoveError,
	} = useSelector((state) => state.RemoveFromCart);

	const { loading, cart, error } = cartData;

	useEffect(() => {
		if (cartIncrementSuccess) {
			dispatch({ type: CART_INCREMENT_ITEM_RESET });
		}
		if (isRemoved) {
			dispatch({ type: CART_REMOVE_ITEM_RESET });
		}
		dispatch(listCart());
	}, [dispatch, cartIncrementSuccess, isRemoved]);

	useEffect(() => {
		dispatch({ type: CART_INCREMENT_ITEM_RESET });
		dispatch({ type: CART_REMOVE_ITEM_RESET });
	}, [dispatch]);

	return (
		<>
			{loading && <Loader />}
			{error ? (
				<Message variant="danger">{error}</Message>
			) : cart ? (
				<>
					<span>
						{cartIncrementLoading && <Loader />}
						{cartRemoveLoading && <Loader />}
						{cartIncrementError && (
							<Message variant="danger">{cartIncrementError}</Message>
						)}
						{cartRemoveError && (
							<Message variant="danger">{cartRemoveError}</Message>
						)}
					</span>
					<Row>
						<Col md={8}>
							<h1>Shopping Cart</h1>
							{cart.products.length === 0 ? (
								<Message>
									Your Cart Is Empty!!,{" "}
									<Link to="/">Click Here To Go Back</Link>{" "}
								</Message>
							) : (
								<ListGroup variant="flush">
									{cart.products.map((item) => (
										<CartProduct key={item._id} item={item} />
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
				</>
			) : (
				""
			)}
		</>
	);
};

export default CartScreen;
