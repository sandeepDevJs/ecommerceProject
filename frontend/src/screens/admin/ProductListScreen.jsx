import React, { useEffect, useMemo } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Table, Pagination, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../../actions/productActions";
import { PRODUCTS } from "../../utils/columns";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import GlobalFilter from "../../components/GlobalFilter";

const ProductListScreen = () => {
	const dispatch = useDispatch();

	const { loading, error, products } = useSelector(
		(state) => state.adminAllProductList
	);

	useEffect(() => {
		dispatch(listAllProducts());
	}, [dispatch]);

	const columns = useMemo(() => PRODUCTS, []);
	const data = useMemo(() => (products ? products : []), [products]);

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
			initialState: { pageSize: 3 },
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<div>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : products.length ? (
				<div>
					{error && <Message variant="danger">{error}</Message>}
					{loading ? <Loader /> : <h1>Products List</h1>}
					{products && (
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
													{...column.getHeaderProps(
														column.getSortByToggleProps()
													)}
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
														<td {...cell.getCellProps()}>
															{cell.render("Cell")}
														</td>
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
										{[3, 6, 9].map((pSize) => (
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
								<Pagination.Item
									onClick={() => nextPage()}
									disabled={!canNextPage}
								>
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
			) : (
				""
			)}
		</div>
	);
};

export default ProductListScreen;
