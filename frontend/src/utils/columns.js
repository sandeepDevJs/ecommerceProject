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
