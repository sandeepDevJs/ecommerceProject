import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import { FormGroup, FormLabel } from "react-bootstrap";
import Message from "../components/Message";
import DatePicker from "react-date-picker";
const Datepicker = (props) => {
	const { label, name, ...rest } = props;
	return (
		<FormGroup>
			<FormLabel>{label}</FormLabel>
			<Field name={name} className="form-control">
				{({ form, field }) => {
					const { setFieldValue } = form;
					const { value } = field;
					return (
						<DateView
							id={name}
							name={name}
							{...field}
							{...rest}
							selected={value && new Date(value)}
							onChange={(val) => setFieldValue(name, val)}
						/>
					);
				}}
			</Field>
			<ErrorMessage name={name}>
				{(errMsg) => <Message variant="danger">{errMsg}</Message>}
			</ErrorMessage>
		</FormGroup>
	);
};

export default Datepicker;
