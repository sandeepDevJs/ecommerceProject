import React, { useEffect } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import { format } from "date-fns";
const OrderDetails = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pagination } = productList;

	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : products.length ? (
				<>
					<h1>Products List</h1>
					<Table
						variant="dark"
						stripped
						bordered
						hover
						responsive
						className="table-sm"
					>
						<thead>
							<tr>
								<th rowspan="2">
									<strong>Title</strong>
								</th>
								<th rowspan="2">
									<strong>Description</strong>
								</th>
								<th colSpan="2">
									<strong>Manufacture Details</strong>
								</th>
								<th rowspan="2">
									<strong>Price</strong>
								</th>
								<th rowspan="2">
									<strong>Rating</strong>
								</th>
								<th rowspan="2">
									<strong>View</strong>
								</th>
							</tr>
							<tr>
								<th>
									<strong>Model Number</strong>
								</th>
								<th>
									<strong>Release Date</strong>
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product.title}</td>
									<td>{product.description.substring(0, 55)}...</td>
									<td>{product.manufacture_details.model_number}</td>
									<td>
										{format(
											new Date(product.manufacture_details.release_date),
											"dd/MM/yyyy"
										)}
									</td>
									<td>${product.pricing.price}</td>
									<td>{product.avgRating}</td>
									<td>
										{" "}
										<LinkContainer to={`../../OrderDetails/${product._id}`}>
											<Button className="btn-sm" variant="light">
												Details
											</Button>
										</LinkContainer>{" "}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			) : (
				""
			)}
		</div>
	);
};

export default OrderDetails;
