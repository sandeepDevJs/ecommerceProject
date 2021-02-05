import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Datepicker from "../../components/Datepicker";
import { fetchCats } from "../../actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, FormGroup, Button, FormLabel } from "react-bootstrap";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstant";
import { createProduct } from "../../actions/productActions";

const ProductCreateScreen = ({ history }) => {
	const initialValues = {
		product_image: "",
		quantity: 0,
		title: "",
		description: "",
		price: 0,
		category: "",
		subcategory: "",
		release_date: "",
		model_number: "",
	};

	const validationSchema = Yup.object({
		product_image: Yup.mixed().required("product image is requird"),
		title: Yup.string()
			.min(4, "Title Must At Least Contain 4 Characters")
			.max(200)
			.required("Required!"),
		description: Yup.string()
			.min(10, "Description Must At Least Contain 10 Characters")
			.max(500)
			.required("Required!"),

		model_number: Yup.string()
			.matches(
				/^[a-zA-Z0-9]{6,}$/,
				"Model Number Should Be Alphanumeric & 10 Characters Long."
			)
			.required("Required!"),
		release_date: Yup.date().required("Required!"),

		category: Yup.string()
			.min(3, "Category Must Be At Least Contain 3 Characters")
			.max(100)
			.required("Required!"),
		subcategory: Yup.string().min(2).max(100).required("Required!"),
		quantity: Yup.number()
			.min(1, "Quantity Cannot Be Less Than 0!")
			.max(50, "Quantity Cannot Be More Than 50!")
			.required("Required!"),

		price: Yup.number()
			.min(10, "Price Should Be Greater Than 10")
			.max(200000, "Quantity Cannot Be More Than 200000!")
			.required("Required!"),
	});

	const dispatch = useDispatch();

	const { loading, cats, error } = useSelector((state) => state.catList);
	const {
		loading: createProductLoading,
		success: createProductSucess,
		error: createProductError,
	} = useSelector((state) => state.adminCreateProduct);

	const [subcats, setSubcats] = useState([]);

	const onChangeSetSubCats = (catId) => {
		let cat = cats.find((cat) => cat._id === catId);
		if (!cat) {
			setSubcats([{ _id: 0, subcategory: " " }]);
		} else {
			setSubcats(cat.subcategories);
		}
	};

	useEffect(() => {
		dispatch(fetchCats());
		dispatch({ type: PRODUCT_CREATE_RESET });
	}, [dispatch]);

	useEffect(() => {
		if (createProductSucess) {
			dispatch({ type: PRODUCT_CREATE_RESET });
			history.push("/admin/products/");
		}
	}, [dispatch, createProductSucess, history]);

	const onSubmitHandler = (values) => {
		let fData = new FormData();
		fData.append("product_image", values.product_image);
		fData.append("title", values.title);
		fData.append("description", values.description);
		fData.append("model_number", values.model_number);
		fData.append("release_date", values.release_date);
		fData.append("price", values.price);
		fData.append("quantity", values.quantity);
		fData.append("category", values.category);
		fData.append("subcategory", values.subcategory);
		dispatch(createProduct(fData));
	};

	return (
		<div>
			{(loading || createProductLoading) && <Loader />}
			{error && <Message variant="danger">{error}</Message>}
			{createProductError && (
				<Message variant="danger">{createProductError}</Message>
			)}
			<Formik
				enableReinitialize
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmitHandler}
			>
				<Form>
					<Row>
						<Col md={3}>
							<FormLabel>Select Image</FormLabel>
							<Field name="product_image">
								{({ form }) => {
									const { setFieldValue } = form;

									return (
										<input
											name="product_image"
											type="file"
											onChange={(e) =>
												setFieldValue("product_image", e.target.files[0])
											}
											accept="image/*"
										/>
									);
								}}
							</Field>
							<ErrorMessage name="product_image">
								{(errMsg) => <Message variant="danger">{errMsg}</Message>}
							</ErrorMessage>
						</Col>
						<Col md={9}>
							<Row>
								<Col md={7}>
									<FormGroup>
										<FormLabel>Title</FormLabel>
										<Field type="text" name="title" className="form-control" />
										<ErrorMessage name="title">
											{(errMsg) => <Message variant="danger">{errMsg}</Message>}
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
											{(errMsg) => <Message variant="danger">{errMsg}</Message>}
										</ErrorMessage>
									</FormGroup>
									<FormGroup>
										<FormLabel>Model Number</FormLabel>
										<Field
											type="text"
											name="model_number"
											className="form-control"
										/>
										<ErrorMessage name="model_number">
											{(errMsg) => <Message variant="danger">{errMsg}</Message>}
										</ErrorMessage>
									</FormGroup>
									<FormGroup>
										<Datepicker label="Release Date" name="release_date" />
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
															onChangeSetSubCats(e.target.value);
														}}
													>
														<option key={0} value={0}>
															select category
														</option>
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
											{(errMsg) => <Message variant="danger">{errMsg}</Message>}
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
														{subcats.map((ct) => (
															<option key={ct._id} value={ct._id}>
																{ct.subcategory}
															</option>
														))}
													</select>
												);
											}}
										</Field>
										<ErrorMessage name="subcategory">
											{(errMsg) => <Message variant="danger">{errMsg}</Message>}
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
											{(errMsg) => <Message variant="danger">{errMsg}</Message>}
										</ErrorMessage>
									</FormGroup>
									<FormGroup>
										<FormLabel>Price</FormLabel>
										<Field
											type="number"
											name="price"
											className="form-control"
										/>
										<ErrorMessage name="price">
											{(errMsg) => <Message variant="danger">{errMsg}</Message>}
										</ErrorMessage>
									</FormGroup>
								</Col>
							</Row>
							<Button type="submit">Update</Button>
						</Col>
					</Row>
				</Form>
			</Formik>
		</div>
	);
};

export default ProductCreateScreen;
