import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { listTopProducts } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";
import { API_PREFIX } from "../utils/apiConstants";

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const { loading, error, products } = useSelector(
		(state) => state.productTopRated
	);

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="dager">{error}</Message>
	) : (
		<Carousel pause="hover" className="bg-dark">
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product.slug}`}>
						<Image
							className="d-block"
							src={product.product_image.replace(
								"https://ecommercecartitapi.herokuapp.com/api/",
								API_PREFIX
							)}
							alt={product.title}
							fluid
						/>
						<Carousel.Caption className="carousel-caption">
							<h2>{product.title}</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
