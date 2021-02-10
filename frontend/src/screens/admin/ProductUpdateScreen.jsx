import React, { useState, useEffect } from "react";
import {
	Row,
	Col,
	FormGroup,
	Button,
	Image,
	FormLabel,
	Modal,
} from "react-bootstrap";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Datepicker from "../../components/Datepicker";
import {
	listProductDetails,
	updateProduct,
	updateImageProduct,
} from "../../actions/productActions";
import {
	PRODUCT_UPDATE_RESET,
	PRODUCT_IMAGE_UPDATE_RESET,
} from "../../constants/productConstant";
import { fetchCats, fetchCatsByIds } from "../../actions/categoryAction";
import * as Yup from "yup";

const ProductUpdateScreen = ({ match }) => {
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

	const { cats } = useSelector((state) => state.catList);

	const { success: updateSuccess, loading: updateLoading } = useSelector(
		(state) => state.adminUpdateProduct
	);

	const {
		loading: imageUpdateLoading,
		error: imageUpdateError,
		success: imageUpdateSuccess,
	} = useSelector((state) => state.updateImage);

	const { cats: catById } = useSelector((state) => state.catById);

	useEffect(() => {
		if (updateSuccess) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
		}
		if (imageUpdateSuccess) {
			dispatch({ type: PRODUCT_IMAGE_UPDATE_RESET });
			handleClose();
		}
		dispatch(listProductDetails(match.params.slug));
		dispatch(fetchCats());
	}, [dispatch, match, updateSuccess, imageUpdateSuccess]);

	useEffect(() => {
		dispatch({ type: PRODUCT_UPDATE_RESET });
	}, [dispatch]);

	useEffect(() => {
		if (!catById._id) {
			dispatch(fetchCatsByIds(product.category._id));
		}
	}, [dispatch, catById, product]);

	const initialValues = {
		product_image: product.product_image,
		quantity: product.quantity,
		title: product.title,
		description: product.description,
		pricing: {
			price: product.pricing.price,
		},
		category: product.category._id,
		subcategory: product.subcategory._id,
		manufacture_details: {
			release_date: new Date(product.manufacture_details.release_date),
			model_number: product.manufacture_details.model_number,
		},
	};

	const onSubmitHandler = (values) => {
		dispatch(updateProduct(product._id, values));
	};

	const [show, setShow] = useState(false);
	const [file, setfile] = useState();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleImageSub = (e) => {
		let fdata = new FormData();
		fdata.append("product_image", file);
		console.log(fdata);
		dispatch(updateImageProduct(product._id, fdata));
		// handleClose();
	};

	// console.log("cats ", cats);
	// console.log("cats by id ", catById);

	return (
		<div>
			<h1> Edit Product Details </h1>
			{(loading || updateLoading) && <Loader />}
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

								<Button className="btn btn-block" onClick={handleShow}>
									Change Image
								</Button>
								<Modal show={show} onHide={handleClose}>
									<Modal.Header closeButton>
										<Modal.Title>Upload Image</Modal.Title>
										{imageUpdateLoading && <Loader />}
										{imageUpdateError && <Message>{imageUpdateError}</Message>}
									</Modal.Header>
									<Modal.Body>
										<input
											type="file"
											onChange={(e) => setfile(e.target.files[0])}
										/>
									</Modal.Body>
									<Modal.Footer>
										<Button variant="secondary" onClick={handleClose}>
											Close
										</Button>
										<Button variant="primary" onClick={handleImageSub}>
											Save Changes
										</Button>
									</Modal.Footer>
								</Modal>
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
											<Datepicker
												label="Release Date"
												name="manufacture_details.release_date"
											/>
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
											<Field name="category">
												{({ form, field }) => {
													const { setFieldValue } = form;
													const { value } = field;
													return (
														<select
															value={value}
															className="form-control"
															onChange={(e) => {
																setFieldValue("category", e.target.value);
																dispatch(fetchCatsByIds(e.target.value));
															}}
														>
															{cats.map((ct) => (
																<option key={ct._id} value={ct._id}>
																	{ct.category}
																</option>
															))}
														</select>
													);
												}}
											</Field>
											<ErrorMessage name="category">
												{(errMsg) => (
													<Message variant="danger">{errMsg}</Message>
												)}
											</ErrorMessage>
										</FormGroup>
										<FormGroup>
											<FormLabel>Subcategory</FormLabel>
											<Field name="subcategory">
												{({ form, field }) => {
													const { setFieldValue } = form;
													const { value } = field;
													return (
														<select
															value={value}
															className="form-control"
															name="subcategory"
															onChange={(e) => {
																setFieldValue("subcategory", e.target.value);
															}}
														>
															<option key={0} value={0}>
																select subctegory
															</option>
															{catById.subcategories.map((ct) => (
																<option key={ct._id} value={ct._id}>
																	{ct.subcategory}
																</option>
															))}
														</select>
													);
												}}
											</Field>
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
