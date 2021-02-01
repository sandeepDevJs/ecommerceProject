import { Link } from "react-router-dom";
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
			<Link to={`/admin/users/usersOrderList/${cell.row.values._id}`}>
				View Order Details
			</Link>
		),
	},
];
