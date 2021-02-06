import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import GlobalFilter from "../../components/GlobalFilter";
import { Table, Pagination, Form, Button } from "react-bootstrap";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import { ORDER_DELIVERED_RESET } from "../../constants/orderConstant";
import { listAllOrder, deliverOrder } from "../../actions/orderActions";
import { format, parseISO } from "date-fns";

const OrderListScreen = () => {
	const { orders, loading, error } = useSelector((state) => state.orderListAll);
	const { success, loading: deliverLoading, error: deliverError } = useSelector(
		(state) => state.orderDeliver
	);
	const dispatch = useDispatch();

	const ORDER_COLUMNS = useRef([
		{
			Header: "Order ID",
			accessor: "_id",
		},
		{
			Header: "Ordered At",
			accessor: "createdAt",
			Cell: ({ cell }) =>
				format(parseISO(cell.row.values.createdAt), "dd/MM/yyyy"),
		},
		{
			Header: "Total Amount",
			accessor: "total",
			Cell: ({ cell }) => `$${cell.row.values.total}`,
		},
		{
			Header: "Paid",
			accessor: "isPaid",
			Cell: ({ value, row }) => {
				let isPaid = value;
				return isPaid ? (
					`${format(parseISO(row.original.paidAt), "dd/MM/yyyy")}`
				) : (
					<i className="fas fa-times" style={{ color: "red" }}></i>
				);
			},
		},
		{
			Header: "Delivered",
			accessor: "isDelivered",
			Cell: ({ cell, row, value }) => {
				let isDelivered = value;
				return isDelivered ? (
					format(parseISO(row.original.deliveredAt), "dd/MM/yyyy")
				) : (
					<Button
						size="sm"
						variant="success"
						onClick={() => markAsDelivered(cell.row.values._id)}
					>
						<i className="fas fa-check"></i>
						Mark As Delivered
					</Button>
				);
			},
		},
		{
			Header: "Details",
			Cell: ({ row }) => (
				<td>
					<Link
						style={{ color: "white" }}
						to={`/admin/OrderDetails/${row.original._id}`}
					>
						View
					</Link>
				</td>
			),
		},
	]);

	let columns = useMemo(() => ORDER_COLUMNS.current, [ORDER_COLUMNS]);
	let data = useMemo(() => (orders ? orders : []), [orders]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		prepareRow,
		pageOptions,
		gotoPage,
		pageCount,
		setPageSize,
		state,
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageSize: 4 },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex, pageSize } = state;
	useEffect(() => {
		dispatch(listAllOrder());
		dispatch({ type: ORDER_DELIVERED_RESET });
	}, [dispatch, success]);

	const markAsDelivered = (id) => {
		dispatch(deliverOrder(id));
	};

	console.log(orders);

	return (
		<div>
			<h1>Orders List</h1>
			{(error || deliverError) && (
				<Message variant="danger">{error || deliverError}</Message>
			)}
			{(loading || deliverLoading) && <Loader />}
			{orders && orders.length > 0 && (
				<div>
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
					<Table
						variant="dark"
						stripped
						bordered
						hover
						responsive
						className="table-sm"
						{...getTableProps()}
					>
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
							{page.map((row) => {
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
					<Pagination>
						<span>
							page{" "}
							<strong>
								{pageIndex + 1} of {pageOptions.length}
							</strong>
						</span>{" "}
						|
						<Form.Group>
							<Form.Control
								style={{ paddingTop: "0px", margin: "0px" }}
								as="select"
								value={pageSize}
								onChange={(e) => setPageSize(parseInt(e.target.value))}
							>
								{[4, 8, 10, 20].map((pSize) => (
									<option key={pSize} value={pSize}>
										show {pSize}
									</option>
								))}
							</Form.Control>
						</Form.Group>
						<Pagination.Item
							onClick={() => gotoPage(0)}
							disabled={!canPreviousPage}
						>
							<i className="fas fa-angle-double-left"></i>
						</Pagination.Item>
						<Pagination.Item
							onClick={() => previousPage()}
							disabled={!canPreviousPage}
						>
							<i className="fas fa-caret-square-left"></i>
						</Pagination.Item>
						<Pagination.Item onClick={() => nextPage()} disabled={!canNextPage}>
							<i className="fas fa-caret-square-right"></i>
						</Pagination.Item>
						<Pagination.Item
							onClick={() => gotoPage(pageCount - 1)}
							disabled={!canNextPage}
						>
							<i className="fas fa-angle-double-right"></i>
						</Pagination.Item>
					</Pagination>
				</div>
			)}
		</div>
	);
};

export default OrderListScreen;
