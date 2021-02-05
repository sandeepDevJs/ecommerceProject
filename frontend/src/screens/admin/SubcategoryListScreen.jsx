import React, { useEffect, useRef, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import {
	Table,
	Button,
	Form,
	Pagination,
	Modal,
	Row,
	Col,
} from "react-bootstrap";
import {
	fetchSubCats,
	deleteSubCat,
	updateSubCat,
	createSubCat,
} from "../../actions/subcategoryActions";
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
import {
	SUBCAT_DELETE_RESET,
	SUBCAT_UPDATE_RESET,
	SUBCAT_CREATE_RESET,
} from "../../constants/subcategoryConstants";
import { Toast } from "../../utils/sweetAlert2";
import Swal from "sweetalert2";

const SubcategoryListScreen = () => {
	const CATEGORY_COLUMNS = useRef([
		{
			Header: "Subcategory",
			accessor: "subcategory",
		},
		{
			Header: "Category",
			accessor: "category_id",
			Cell: ({ cell }) => cell.row.values.category_id.category,
		},
		{
			Header: "Update",
			// accessor: "_id",
			Cell: ({ cell }) => (
				<Button
					size="sm"
					variant="success"
					onClick={() =>
						updateSubCatHandler(
							cell.row.values._id,
							cell.row.values.category_id._id,
							cell.row.values.subcategory
						)
					}
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
					onClick={() => deleteSubCategoryHandler(cell.row.values._id)}
				>
					<i className="fas fa-trash-alt"></i>
				</Button>
			),
		},
	]);

	const { loading, subcats, error } = useSelector((state) => state.subcatList);
	const {
		loading: deleteSubCatLoading,
		success: deleteSubCatSuccess,
		error: deleteSubCatError,
	} = useSelector((state) => state.deleteSubCat);

	const {
		loading: updateSubCatLoading,
		success: updateSubCatSuccess,
		error: updateSubCatError,
	} = useSelector((state) => state.updateSubCat);

	const {
		loading: createSubCatLoading,
		success: createSubCatSuccess,
		error: createSubCatError,
	} = useSelector((state) => state.createSubCat);

	const { loading: catsLoading, cats } = useSelector((state) => state.catList);

	const dispatch = useDispatch();

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [subcatField, setSubcatField] = useState("");
	const [subcatSelect, setSubcatSelect] = useState("");
	const [subcatId, setSubcatId] = useState("");

	useEffect(() => {
		if (deleteSubCatSuccess) {
			dispatch({ type: SUBCAT_DELETE_RESET });
		}
		if (updateSubCatSuccess) {
			dispatch({ type: SUBCAT_UPDATE_RESET });
		}
		if (createSubCatSuccess) {
			dispatch({ type: SUBCAT_CREATE_RESET });
		}
		dispatch(fetchCats());
		dispatch(fetchSubCats());
	}, [dispatch, deleteSubCatSuccess, updateSubCatSuccess, createSubCatSuccess]);

	useEffect(() => {
		dispatch({ type: SUBCAT_DELETE_RESET });
		dispatch({ type: SUBCAT_UPDATE_RESET });
		dispatch({ type: SUBCAT_CREATE_RESET });
	}, [dispatch]);

	const categoryColumns = useMemo(() => CATEGORY_COLUMNS.current, [
		CATEGORY_COLUMNS,
	]);
	const data = useMemo(() => (subcats ? subcats : []), [subcats]);

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

	const deleteSubCategoryHandler = (subcatId) => {
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
				dispatch(deleteSubCat(subcatId));
			}
		});
	};

	const updateSubCatHandler = (subcatId, catId, subcat) => {
		handleShow();
		setSubcatSelect(catId);
		setSubcatField(subcat);
		setSubcatId(subcatId);
	};

	const saveChanges = (id) => {
		let body = {
			subcategory: subcatField,
			category_id: subcatSelect,
		};
		dispatch(updateSubCat(id, body));
		handleClose();
	};

	const createSubCatBtn = () => {
		let inputOptions = {};
		_.map(cats, function (o) {
			inputOptions[o._id] = o.category;
		});

		console.log("input options ", inputOptions);
		Swal.mixin({
			confirmButtonText: "Next &rarr;",
			showCancelButton: true,
			progressSteps: ["1", "2"],
		})
			.queue([
				{
					title: "Subcategory Name",
					input: "text",
				},
				{
					title: "Select Category Name",
					input: "select",
					inputOptions,
				},
			])
			.then((result) => {
				if (result.value) {
					let body = {
						category_id: result.value[1],
						subcategory: result.value[0],
					};
					dispatch(createSubCat(body));
				}
			});
	};

	if (createSubCatLoading) {
		Swal.fire({
			title: "Creating....",
		});
	}

	if (deleteSubCatSuccess || updateSubCatSuccess || createSubCatSuccess) {
		let msg = deleteSubCatSuccess
			? "deleted"
			: updateSubCatSuccess
			? "updated"
			: createSubCatSuccess
			? "created"
			: "";

		Toast.fire({
			icon: "success",
			title: `Data ${msg} Successfully!`,
		});
		if (createSubCatSuccess) {
			Swal.close();
		}
	}

	return (
		<div>
			{loading && <Loader />}
			{deleteSubCatLoading && <Loader />}
			{error && <Message variant="danger">{error}</Message>}
			{deleteSubCatError && (
				<Message variant="danger">{deleteSubCatError}</Message>
			)}
			{createSubCatError && (
				<Message variant="danger">{createSubCatError}</Message>
			)}
			{subcats.length && (
				<div>
					<Row>
						<Col md={9}>
							<h1>Subcategory List</h1>
						</Col>
						<Col md={3}>
							<Button
								style={{ float: "right" }}
								onClick={() => {
									createSubCatBtn();
								}}
							>
								Create Subcategory
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
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Update Subcategory</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						{catsLoading && <Loader />}
						{updateSubCatLoading && <Loader />}
						{updateSubCatError && (
							<Message variant="danger">{updateSubCatError}</Message>
						)}
						<Form.Label>Subcategory Name</Form.Label>
						<Form.Control
							type="text"
							value={subcatField}
							onChange={(e) => setSubcatField(e.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as="select"
							value={subcatSelect}
							onChange={(e) => setSubcatSelect(e.target.value)}
						>
							{cats.map((ct) => (
								<option key={ct._id} value={ct._id}>
									{ct.category}
								</option>
							))}
						</Form.Control>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={() => saveChanges(subcatId)}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default SubcategoryListScreen;
