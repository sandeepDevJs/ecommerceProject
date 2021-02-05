import React, { useEffect, useRef, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Form, Pagination, Modal } from "react-bootstrap";
import {
	fetchSubCats,
	deleteSubCat,
	updateSubCat,
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
		dispatch(fetchSubCats());
	}, [dispatch, deleteSubCatSuccess, updateSubCatSuccess]);

	useEffect(() => {
		dispatch({ type: SUBCAT_DELETE_RESET });
		dispatch({ type: SUBCAT_UPDATE_RESET });
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
		dispatch(fetchCats());
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

	if (deleteSubCatSuccess) {
		Toast.fire({
			icon: "success",
			title: "Data Deleted Successfully!",
		});
	}

	if (updateSubCatSuccess) {
		Toast.fire({
			icon: "success",
			title: "Data Updated Successfully!",
		});
	}

	console.log("Sub cats ", subcats);

	return (
		<div>
			{loading && <Loader />}
			{deleteSubCatLoading && <Loader />}
			{error && <Message variant="danger">{error}</Message>}
			{deleteSubCatError && (
				<Message variant="danger">{deleteSubCatError}</Message>
			)}
			{subcats.length && (
				<div>
					<h1>Subcategory List</h1>
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
