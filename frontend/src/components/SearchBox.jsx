import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState("");

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push("/");
		}
	};

	return (
		<div>
			<Form onSubmit={onSubmitHandler} inline>
				<Form.Control
					type="text"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder="Search Products...."
					className="mr-sm-2 ml-sm-5"
				></Form.Control>
				<Button type="submit" variant="outline-success" className="p-2">
					Search
				</Button>
			</Form>
		</div>
	);
};

export default SearchBox;
