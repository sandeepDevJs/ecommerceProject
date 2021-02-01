import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Image } from "react-bootstrap";
export const USER_LIST_COLUMNS = [
	{
		Header: "Id",
		accessor: "_id",
	},
	{
		Header: "name",
		accessor: "name",
	},
	{
		Header: "E-mail",
		accessor: "email",
	},
	{
		Header: "view",
		Cell: ({ cell }) => (
			<td>
				<Link
					style={{ color: "white" }}
					to={`/admin/users/usersOrderList/${cell.row.values._id}`}
				>
					View Order Details
				</Link>
			</td>
		),
	},
];

export const PRODUCTS = [
	{
		Header: "Image",
		accessor: "product_image",
		sortable: false,
		filterable: false,
		Cell: ({ cell }) => (
			<Image
				src={cell.row.values.product_image}
				alt={cell.row.values.title}
				fluid
				rounded
			/>
		),
	},
	{
		Header: "Title",
		accessor: "title",
	},

	{
		Header: "Description",
		accessor: "description",
	},
	{
		Header: "Model Number",
		accessor: "manufacture_details.model_number",
	},
	{
		Header: "Release Date",
		accessor: "manufacture_details",
		Cell: ({ cell }) =>
			format(
				new Date(cell.row.values.manufacture_details.release_date),
				"dd/MM/yyyy"
			),
	},

	{
		Header: "Price",
		accessor: "pricing.price",
	},
	{
		Header: "rating",
		accessor: "avgRating",
	},
];
