import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Row,
	Col,
	ListGroup,
	Image,
	InputGroup,
	FormControl,
	Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
	CART_INCREMENT_ITEM_REQUEST,
	CART_INCREMENT_ITEM_SUCCESS,
	CART_INCREMENT_ITEM_FAILS,
} from "../constants/cartConstant";
import { incrementCart, listCart } from "../actions/cartAction";
import Message from "./Message";
import Loader from "./Loader";

const CartProduct = ({ item }) => {
	const dispatch = useDispatch();

	const {
		cartIncrementloading,
		cartIncrement,
		cartIncrementerror,
	} = useSelector((state) => state.isCartIncrement);

	const handleQtyButton = (op, pid) => {
		dispatch({ type: CART_INCREMENT_ITEM_REQUEST });
		if (op === "increment") {
			dispatch(incrementCart(pid));
		} else if (op === "decrement") {
			dispatch(incrementCart(pid, "decrement"));
		}

		dispatch(listCart());
	};

	return (
		<ListGroup.Item>
			{cartIncrementerror && (
				<Message variant="danger">{cartIncrementerror}</Message>
			)}
			<Row>
				<Col md={2}>
					<Image
						src={item.productId.product_image}
						alt={item.productId.title}
						fluid
						rounded
					/>
				</Col>
				<Col md={3}>
					<Link to={`/product/${item.productId.slug}`}>
						{item.productId.title}
					</Link>
				</Col>
				<Col md={2}>${item.productId.pricing.price}</Col>
				<Col md={3}>
					<Row>
						<InputGroup className="mb-1">
							<InputGroup.Prepend>
								<Button
									variant="outline-secondary"
									onClick={() =>
										handleQtyButton("increment", item.productId._id)
									}
								>
									+
								</Button>
							</InputGroup.Prepend>
							<FormControl value={item.quantity} disabled />
							<InputGroup.Append>
								<Button
									variant="outline-secondary"
									onClick={() =>
										handleQtyButton("decrement", item.productId._id)
									}
								>
									-
								</Button>
							</InputGroup.Append>
						</InputGroup>
					</Row>
				</Col>
				<Col md={2}>{cartIncrementloading && <Loader />}</Col>
			</Row>
		</ListGroup.Item>
	);
};

export default CartProduct;
