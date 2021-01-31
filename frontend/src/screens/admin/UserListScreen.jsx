import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersList } from "../../actions/admin/userActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { USER_LIST_COLUMNS } from "../../utils/columns";
import { FormControl, FormGroup, FormLabel, Table } from "react-bootstrap";
import { useTable, useSortBy } from "react-table";

const UserListScreen = () => {
	const [q, setQ] = useState("");

	const dispatch = useDispatch();
	const { loading, error, data: userData } = useSelector(
		(state) => state.adminUserAllUser
	);

	useEffect(() => {
		dispatch(getAllUsersList());
		// console.log("user data", userData);
	}, [dispatch]);

	const columns = useMemo(() => USER_LIST_COLUMNS, []);
	const data = useMemo(() => (userData ? userData : []), [userData]);

	const tableIstance = useTable(
		{
			columns,
			data,
		},
		useSortBy
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = tableIstance;

	// const searchData = (rows) =>
	// 	rows.filter(
	// 		(row) =>
	// 			row.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
	// 			row.email.toLowerCase().indexOf(q.toLowerCase()) > -1
	// 	);

	return (
		<div>
			{error && <Message variant="danger">{error}</Message>}
			{loading ? <Loader /> : <h1>users list</h1>}
			{userData && (
				<div>
					<FormGroup>
						<FormLabel>Search :</FormLabel>
						<FormControl
							type="text"
							placeholder="Search Here.."
							value={q}
							onChange={(e) => setQ(e.target.value)}
						/>
					</FormGroup>
					<Table {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => (
										<th
											{...column.getHeaderProps(column.getSortByToggleProps())}
										>
											{" "}
											{column.render("Header")}{" "}
											<span>
												{column.isSorted ? (
													column.isSortedDesc ? (
														<i className="fas fa-sort-down"></i>
													) : (
														<i className="fas fa-sort-up"></i>
													)
												) : (
													""
												)}
											</span>
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{rows.map((row) => {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()}>
										{row.cells.map((cell) => {
											return (
												<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			)}
		</div>
	);
};

export default UserListScreen;
