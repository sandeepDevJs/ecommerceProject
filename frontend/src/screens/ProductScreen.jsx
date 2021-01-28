import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import {
	listProductDetails,
	createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";
import { CART_ADD_ITEM_RESET } from "../constants/cartConstant";
import { AddToCart } from "../actions/cartAction";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import MetaContainer from "../components/MetaContainer";

const ProductScreen = ({ match }) => {
	const dispatch = useDispatch();
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	const [productAddedstate, setProductAddedstate] = useState(0);

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const cartState = useSelector((state) => state.AddToCart);

	const productCreateReview = useSelector((state) => state.productCreateReview);
	const {
		succes: successCreateReview,
		error: errorCreateReview,
	} = productCreateReview;

	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (successCreateReview) {
			alert("Review Submitted!");
			setRating(0);
			setComment("");
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(match.params.slug));
	}, [dispatch, match, successCreateReview, cartState]);

	const addToCartHandler = (pid) => {
		dispatch(AddToCart(pid, qty));
		setProductAddedstate(1);
	};

	const allCartProducts = useSelector((state) => state.cartList);

	const isInCart = (pid) => {
		if (!allCartProducts.cart) {
			return false;
		}
		let listOfCartProduct = allCartProducts.cart.products;
		return listOfCartProduct.some((item) => item.productId._id === pid);
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(product._id, { text: comment, rating }));
	};

	useEffect(() => {
		dispatch({ type: CART_ADD_ITEM_RESET });
		dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
	}, [dispatch]);

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
				<>
					<MetaContainer title={product.title} />
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
										{cartState.error && (
											<Message variant="danger">{cartState.error}</Message>
										)}

										{isInCart(product._id) ? (
											<Button className="btn-block" type="button">
												<i className="fas fa-check"></i>
											</Button>
										) : cartState.loading ? (
											<Button className="btn-block" type="button">
												<Loader />
											</Button>
										) : productAddedstate ? (
											<Button className="btn-block" type="button">
												<i className="fas fa-check"></i>
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
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant="flush">
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.user.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAdd.substring(0, 10)}</p>
										<p>{review.text}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write A Customer Review</h2>
									{errorCreateReview && (
										<Message variant="danger">{errorCreateReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={onSubmitHandler}>
											<Form.Group controlId="rating">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value="">Select...</option>
													<option value="1">1 - Poor</option>
													<option value="2">2 - Fair</option>
													<option value="3">3 - Good</option>
													<option value="4">4 - Very Good</option>
													<option value="5">5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group>
												<Form.Control
													as="textarea"
													constrolId="comment"
													row={3}
													value={comment}
													placeholder="Write A Review..."
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type="submit" variant="primary">
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to="/login"> Sign In </Link>To Write A Review{" "}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
