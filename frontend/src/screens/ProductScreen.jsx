import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { listProductDetails } from "../actions/productActions";
import { AddToCart } from "../actions/cartAction";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match }) => {
	const dispatch = useDispatch();
	const [qty, setQty] = useState(1);
	const [addToCartState, setCartState] = useState({});

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	const cartState = useSelector((state) => state.AddToCart);

	useEffect(() => {
		dispatch(listProductDetails(match.params.slug));
	}, [dispatch, match.params.slug]);

	const addToCartHandler = (pid) => {
		dispatch(AddToCart(pid, qty));
		setCartState(cartState);
	};

	const allCartProducts = useSelector((state) => state.cartList);

	const isInCart = (pid) => {
		if (!allCartProducts.cart) {
			return false;
		}
		let listOfCartProduct = allCartProducts.cart.products;
		console.log(listOfCartProduct);
		return listOfCartProduct.some((item) => item.productId._id === pid);
	};

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.product_image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h3>{product.title}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.avgRating}
									text={`${product.avgRating} Ratings`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>Price ${product.pricing.price}</ListGroup.Item>
							<ListGroup.Item>{product.description}</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong>${product.pricing.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>
											<strong>
												{product.quantity > 0 ? "In Stock" : "Out Of Stock"}
											</strong>
										</Col>
									</Row>
								</ListGroup.Item>

								{product.quantity > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Qty</Col>
											<Col>
												<select
													value={qty}
													onChange={(e) => setQty(e.target.value)}
												>
													{[...Array(product.quantity).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
											</Col>
										</Row>
									</ListGroup.Item>
								)}

								<ListGroup.Item>
									{addToCartState.error && (
										<Message variant="danger">{addToCartState.error}</Message>
									)}

									{isInCart(product._id) ? (
										<Button className="btn-block" type="button">
											<i class="fas fa-check"></i>
										</Button>
									) : addToCartState.loading ? (
										<Button className="btn-block" type="button">
											<Loader />
										</Button>
									) : addToCartState.isAdded ? (
										<Button className="btn-block" type="button">
											<i class="fas fa-check"></i>
										</Button>
									) : (
										<Button
											onClick={() => addToCartHandler(product._id)}
											className="btn-block"
											type="button"
											disabled={product.quantity === 0}
										>
											Add To Cart
										</Button>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
};

export default ProductScreen;
