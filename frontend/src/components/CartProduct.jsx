import React from "react";
import { useDispatch } from "react-redux";
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
import { incrementCart, removeFromCart } from "../actions/cartAction";

const CartProduct = ({ item }) => {
	const dispatch = useDispatch();

	const handleQtyButton = (op, pid) => {
		if (op === "increment") {
			dispatch(incrementCart(pid));
		} else if (op === "decrement") {
			dispatch(incrementCart(pid, "decrement"));
		}
	};

	const removeFromCartHandler = (e) => {
		e.preventDefault();
		dispatch(removeFromCart(item.productId._id));
	};

	return (
		<ListGroup.Item key={item._id}>
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
				<Col md={5}>
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
							<InputGroup.Append>
								<Button
									variant="outline-secondary"
									className="btn-danger"
									onClick={removeFromCartHandler}
								>
									<i className="fas fa-trash"></i>
								</Button>
							</InputGroup.Append>
						</InputGroup>
					</Row>
				</Col>
			</Row>
		</ListGroup.Item>
	);
};

export default CartProduct;
