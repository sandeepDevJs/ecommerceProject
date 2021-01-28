import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import MetaContainer from "../components/MetaContainer";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";

const HomeScreen = ({ match }) => {
	let keyword = match.params.keyword;
	let page = match.params.page || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pagination } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, page));
	}, [dispatch, keyword, page]);

	return (
		<>
			<MetaContainer />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to="/" className="btn btn-light">
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pagination.pages}
						page={page}
						keyword={keyword ? keyword : undefined}
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
