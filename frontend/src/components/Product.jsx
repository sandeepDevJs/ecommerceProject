import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { API_PREFIX } from "../utils/apiConstants";

const Product = ({ product }) => {
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/product/${product.slug}`}>
				<Card.Img
					src={product.product_image?.replace(
						"https://ecommercecartitapi.herokuapp.com/api/",
						API_PREFIX
					)}
					variant="top"
				/>
			</Link>
			<Card.Body>
				<Link to={`/product/${product.slug}`}>
					<Card.Title as="div">
						<strong>{product.title}</strong>
					</Card.Title>
				</Link>

				<Card.Text as="div">
					<Rating
						value={product.avgRating}
						text={`${product.avgRating} Rating`}
					/>
				</Card.Text>

				<Card.Text as="h3">${product.pricing.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
