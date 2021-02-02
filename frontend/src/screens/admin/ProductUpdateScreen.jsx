import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Button, Image, FormLabel } from "react-bootstrap";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { listProductDetails } from "../../actions/productActions";
import * as Yup from "yup";
import { format } from "date-fns";

const ProductUpdateScreen = ({ match }) => {
	const [file, setfile] = useState();

	const validationSchema = Yup.object({
		title: Yup.string()
			.min(4, "Title Must At Least Contain 4 Characters")
			.max(200)
			.required("Required!"),
		description: Yup.string()
			.min(10, "Description Must At Least Contain 10 Characters")
			.max(500)
			.required("Required!"),
		manufacture_details: Yup.object({
			model_number: Yup.string()
				.matches(
					/^[a-zA-Z0-9]{6,}$/,
					"Model Number Should Be Alphanumeric & 10 Characters Long."
				)
				.required("Required!"),
			release_date: Yup.date().required("Required!"),
		}),
		category: Yup.string()
			.min(3, "Category Must Be At Least Contain 3 Characters")
			.max(100)
			.required("Required!"),
		subcategory: Yup.string().min(2).max(100).required("Required!"),
		quantity: Yup.number()
			.min(1, "Quantity Cannot Be Less Than 0!")
			.max(50, "Quantity Cannot Be More Than 50!")
			.required("Required!"),
		pricing: Yup.object({
			price: Yup.number()
				.min(10, "Price Should Be Greater Than 10")
				.max(200000, "Quantity Cannot Be More Than 200000!")
				.required("Required!"),
		}),
	});

	const dispatch = useDispatch();
	const { loading, product, error } = useSelector(
		(state) => state.productDetails
	);

	useEffect(() => {
		dispatch(listProductDetails(match.params.slug));
		console.log("use Effect ran!");
	}, [dispatch, match]);

	const initialValues = {
		...product,
	};

	const onSubmitHandler = () => {
		let data = new FormData();
		data.append("produc", "hello");
		console.log(file);
	};

	return (
		<div>
			<h1> Edit Product Details </h1>
			{loading && <Loader />}
			{error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmitHandler}
				>
					<Form>
						<Row>
							<Col md={3}>
								<Image src={product.product_image} alt="" fluid rounded />

								<input
									type="file"
									placeholder="Enter Email"
									className="form-control"
									name="product_image"
									accept="image/*"
									onChange={(event) => {
										setfile(event.target.files[0]);
									}}
								/>
							</Col>
							<Col md={9}>
								<Row>
									<Col md={7}>
										<FormGroup>
											<FormLabel>Title</FormLabel>
											<Field
												type="text"
												name="title"
												className="form-control"
											/>
											<ErrorMessage name="title">
												{(errMsg) => (
													<Message variant="danger">{errMsg}</Message>
												)}
											</ErrorMessage>
										</FormGroup>
										<FormGroup>
											<FormLabel>Description</FormLabel>
											<Field
												as="textarea"
												name="description"
												className="form-control"
											/>
											<ErrorMessage name="description">
												{(errMsg) => (
													<Message variant="danger">{errMsg}</Message>
												)}
											</ErrorMessage>
										</FormGroup>
										<FormGroup>
											<FormLabel>Model Number</FormLabel>
											<Field
												type="text"
												name="manufacture_details.model_number"
												className="form-control"
											/>
											<ErrorMessage name="manufacture_details.model_number">
												{(errMsg) => (
													<Message variant="danger">{errMsg}</Message>
												)}
											</ErrorMessage>
										</FormGroup>
										<FormGroup>
											<FormLabel>Release Date</FormLabel>
											<Field>
												{(props) => {
													let { field } = props;
													return (
														<input
															type="date"
															className="form-control"
															{...field}
															name="manufacture_details.release_date"
														/>
													);
												}}
											</Field>
											<ErrorMessage name="manufacture_details.release_date">
												{(errMsg) => (
													<Message variant="danger">{errMsg}</Message>
												)}
											</ErrorMessage>
										</FormGroup>
									</Col>
									<Col md={5}>
										<FormGroup>
											<FormLabel>category</FormLabel>
											<Field
												type="text"
												name="category"
												className="form-control"
											/>
											<ErrorMessage name="category">
												{(errMsg) => (
													<Message variant="danger">{errMsg}</Message>
												)}
											</ErrorMessage>
										</FormGroup>
										<FormGroup>
											<FormLabel>Subcategory</FormLabel>
											<Field
												type="text"
												name="subcategory"
												className="form-control"
											/>
											<ErrorMessage name="subcategory">
												{(errMsg) => (
													<Message variant="danger">{errMsg}</Message>
												)}
											</ErrorMessage>
										</FormGroup>
										<FormGroup>
											<FormLabel>Qunatity</FormLabel>
											<Field
												type="number"
												name="quantity"
												className="form-control"
											/>
											<ErrorMessage name="quantity">
												{(errMsg) => (
													<Message variant="danger">{errMsg}</Message>
												)}
											</ErrorMessage>
										</FormGroup>
										<FormGroup>
											<FormLabel>Price</FormLabel>
											<Field
												type="number"
												name="pricing.price"
												className="form-control"
											/>
											<ErrorMessage name="pricing.price">
												{(errMsg) => (
													<Message variant="danger">{errMsg}</Message>
												)}
											</ErrorMessage>
										</FormGroup>
									</Col>
								</Row>
								<Button type="submit">Update</Button>
							</Col>
						</Row>
					</Form>
				</Formik>
			)}
		</div>
	);
};

export default ProductUpdateScreen;
