import React, { useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Form, Pagination } from "react-bootstrap";
import { fetchCats } from "../../actions/categoryAction";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import GlobalFilter from "../../components/GlobalFilter";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";

const CategoryListScreen = () => {
	const CATEGORY_COLUMNS = useRef([
		{
			Header: "Category",
			accessor: "category",
		},
		{
			Header: "Update",
			// accessor: "_id",
			Cell: ({ cell }) => (
				<Button size="sm" variant="success" onClick={() => cell.row.values._id}>
					<i className="fas fa-edit"></i>
				</Button>
			),
		},
		{
			Header: "Delete",
			accessor: "_id",
			Cell: ({ cell }) => (
				<Button
					type="button"
					size="sm"
					variant="danger"
					onClick={() => cell.row.values._id}
				>
					<i className="fas fa-trash-alt"></i>
				</Button>
			),
		},
	]);

	const { loading, cats, error } = useSelector((state) => state.catList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCats());
	}, [dispatch]);

	const categoryColumns = useMemo(() => CATEGORY_COLUMNS.current, [
		CATEGORY_COLUMNS,
	]);
	const data = useMemo(() => (cats ? cats : []), [cats]);

	const {
		getTableBodyProps,
		getTableProps,
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
			columns: categoryColumns,
			data,
			initialState: { pageSize: 5 },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<div>
			{loading && <Loader />}
			{error && <Message>{error}</Message>}
			{cats.length && (
				<div>
					<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
					<Table
						variant="dark"
						stripped
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
											{column.render("Header")}
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
								{[5, 10, 15, 20].map((psize) => (
									<option key={psize} value={psize}>
										show {psize}
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

export default CategoryListScreen;
