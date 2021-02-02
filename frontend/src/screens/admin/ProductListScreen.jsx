import React, { useEffect, useMemo, useRef } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Table, Pagination, Form, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts, deleteProduct } from "../../actions/productActions";
import { PRODUCT_DELETE_RESET } from "../../constants/productConstant";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import GlobalFilter from "../../components/GlobalFilter";
import { Toast } from "../../utils/sweetAlert2";
import Swal from "sweetalert2";

const ProductListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const { loading, error, products } = useSelector(
		(state) => state.adminAllProductList
	);

	const {
		loading: deleteProdutLoading,
		error: deleteProdutError,
		success: deleteProdutSuccess,
	} = useSelector((state) => state.adminDeleteProduct);

	const handleClick = (slug) => {
		history.push(`/admin/products/edit/${slug}`);
	};

	const deleteProductOnClick = (pid) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteProduct(pid));
				Toast.fire({
					icon: "success",
					title: "Data Delete Successfully!",
				});
			}
		});
	};

	useEffect(() => {
		if (deleteProdutSuccess) {
			dispatch({ type: PRODUCT_DELETE_RESET });
		}
		dispatch(listAllProducts());
	}, [dispatch, deleteProdutSuccess]);

	useEffect(() => {
		dispatch({ type: PRODUCT_DELETE_RESET });
	}, [dispatch]);

	const PRODUCTS = useRef([
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
			Cell: ({ cell }) => `${cell.row.values.description.substring(0, 30)}...`,
		},
		{
			Header: "Category",
			accessor: "category",
		},
		{
			Header: "Subcategory",
			accessor: "subcategory",
		},

		{
			Header: "Price",
			accessor: "pricing.price",
		},
		{
			Header: "rating",
			accessor: "avgRating",
		},

		{
			Header: "Update",
			accessor: "slug",
			Cell: ({ cell }) => (
				<Button
					size="sm"
					variant="success"
					onClick={() => handleClick(cell.row.values.slug)}
				>
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
					onClick={() => deleteProductOnClick(cell.row.values._id)}
				>
					<i className="fas fa-trash-alt"></i>
				</Button>
			),
		},
	]);

	const columns = useMemo(() => PRODUCTS.current, [PRODUCTS]);
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
							{deleteProdutError && (
								<Message variant="danger">{deleteProdutError}</Message>
							)}
							{deleteProdutLoading && <Loader />}
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
