import React, { useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Form, Pagination, Row, Col } from "react-bootstrap";
import {
	fetchCats,
	deleteCat,
	updateCat,
	createCat,
} from "../../actions/categoryAction";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import GlobalFilter from "../../components/GlobalFilter";
import {
	useTable,
	useSortBy,
	useGlobalFilter,
	usePagination,
} from "react-table";
import {
	CAT_DELETE_RESET,
	CAT_UPDATE_RESET,
	CAT_CREATE_RESET,
} from "../../constants/categoryConstants";
import { Toast } from "../../utils/sweetAlert2";
import Swal from "sweetalert2";

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
				<Button
					size="sm"
					variant="success"
					onClick={() => updateCatHandler(cell.row.values._id)}
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
					onClick={() => deleteCategoryHandler(cell.row.values._id)}
				>
					<i className="fas fa-trash-alt"></i>
				</Button>
			),
		},
	]);

	const { loading, cats, error } = useSelector((state) => state.catList);
	const {
		loading: deleteCatLoading,
		success: deleteCatSuccess,
		error: deleteCatError,
	} = useSelector((state) => state.deleteCat);

	const {
		loading: updateCatLoading,
		success: updateCatSuccess,
		error: updateCatError,
	} = useSelector((state) => state.updateCat);

	const {
		loading: createCatLoading,
		success: createCatSuccess,
		error: createCatError,
	} = useSelector((state) => state.createCat);
	const dispatch = useDispatch();

	useEffect(() => {
		if (deleteCatSuccess) {
			dispatch({ type: CAT_DELETE_RESET });
		}
		if (updateCatSuccess) {
			dispatch({ type: CAT_UPDATE_RESET });
		}
		if (createCatSuccess) {
			dispatch({ type: CAT_UPDATE_RESET });
		}
		dispatch(fetchCats());
	}, [dispatch, deleteCatSuccess, updateCatSuccess, createCatSuccess]);

	useEffect(() => {
		dispatch({ type: CAT_DELETE_RESET });
		dispatch({ type: CAT_UPDATE_RESET });
		dispatch({ type: CAT_CREATE_RESET });
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

	const deleteCategoryHandler = (catId) => {
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
				dispatch(deleteCat(catId));
			}
		});
	};

	const updateCatHandler = (catId) => {
		Swal.fire({
			title: "Category Name",
			input: "text",
			inputAttributes: {
				autocapitalize: "off",
			},
			showCancelButton: true,
			confirmButtonText: "Update",
			showLoaderOnConfirm: true,
			preConfirm: (text) => {
				if (!text.trim().length) {
					Swal.showValidationMessage(`Required!`);
				} else if (text.trim().length < 3) {
					Swal.showValidationMessage(`Too Small Name!`);
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(updateCat(catId, { category: result.value }));
			}
		});
	};

	const createCatBtn = () => {
		Swal.fire({
			title: "Category Name",
			input: "text",
			inputAttributes: {
				autocapitalize: "off",
			},
			showCancelButton: true,
			confirmButtonText: "Create",
			showLoaderOnConfirm: true,
			preConfirm: (text) => {
				if (!text.trim().length) {
					Swal.showValidationMessage(`Required!`);
				} else if (text.trim().length < 3) {
					Swal.showValidationMessage(`Too Small Name!`);
				}
			},
			allowOutsideClick: () => !Swal.isLoading(),
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(createCat({ category: result.value }));
			}
		});
	};

	if (deleteCatSuccess || updateCatSuccess) {
		let msg = deleteCatSuccess ? "deleted" : updateCatSuccess ? "updated" : "";

		Toast.fire({
			icon: "success",
			title: `Data ${msg} Successfully!`,
		});
	}

	if (createCatLoading) {
		Swal.fire({
			title: "Creating....",
		});
	}

	if (createCatSuccess) {
		Toast.fire({
			icon: "success",
			title: "Data Created Successfully!",
		});
	}

	if (createCatError) {
		Swal.close();
	}

	return (
		<div>
			{loading && <Loader />}
			{deleteCatLoading && <Loader />}
			{updateCatLoading && <Loader />}
			{error && <Message variant="danger">{error}</Message>}
			{deleteCatError && <Message variant="danger">{deleteCatError}</Message>}
			{updateCatError && <Message variant="danger">{updateCatError}</Message>}
			{createCatError && <Message variant="danger">{createCatError}</Message>}
			{cats.length && (
				<div>
					<Row>
						<Col md={9}>
							<h1>category List</h1>
						</Col>
						<Col md={3}>
							<Button
								style={{ float: "right" }}
								onClick={() => {
									createCatBtn();
								}}
							>
								Create Category
							</Button>
						</Col>
					</Row>
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
