import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormLabel, FormGroup, Row, Col, Button, Modal } from "react-bootstrap";
// import Loader from "../../components/Loader";
import Message from "../components/Message";

const Tests = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const initialValues = {
		details: {
			firstName: "abc",
			MiddleName: "abc",
			LastName: "abc",
		},
	};

	const validationSchema = Yup.object({
		details: Yup.object({
			firstName: Yup.string().required("Required!"),
			MiddleName: Yup.string().required("Required!"),
			LastName: Yup.string().required("Required!"),
		}),
	});

	const onSubmitHandler = (values) => {
		console.log(values);
	};

	return (
		<div>
			<Button target="#test1" variant="primary" onClick={handleShow}>
				Fill Form
			</Button>
			<Modal id="test1" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmitHandler}
				>
					<Form>
						<Modal.Body>
							<FormGroup>
								<FormLabel>First Name : </FormLabel>
								<Field
									type="text"
									className="form-control"
									name="details.firstName"
								/>
								<ErrorMessage name="details.firstName">
									{(errMsg) => <Message variant="danger">{errMsg}</Message>}
								</ErrorMessage>
							</FormGroup>
							<FormGroup>
								<FormLabel> Middle Name : </FormLabel>
								<Field
									type="text"
									className="form-control"
									name="details.MiddleName"
								/>
								<ErrorMessage name="details.MiddleName">
									{(errMsg) => <Message variant="danger">{errMsg}</Message>}
								</ErrorMessage>
							</FormGroup>
							<FormGroup>
								<FormLabel>Last Name : </FormLabel>
								<Field
									type="text"
									className="form-control"
									name="details.LastName"
								/>
								<ErrorMessage name="details.LastName">
									{(errMsg) => <Message variant="danger">{errMsg}</Message>}
								</ErrorMessage>
							</FormGroup>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" type="submit" onClick={handleClose}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Form>
				</Formik>
			</Modal>
		</div>
	);
};

export default Tests;
