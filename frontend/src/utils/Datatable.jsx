import React from "react";
import { Table } from "react-bootstrap";

const Datatable = ({ data, columns }) => {
	return (
		<Table striped bordered hover size="sm">
			<thead>
				<tr>
					<th>ID</th>
					{columns.map((heading) => (
						<th>{heading}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((item) => {
					return (
						<tr>
							<td>{item._id}</td>
							{columns.map((dt) => (
								<td>{item[dt]}</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};

export default Datatable;
