import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import Box from "../../components/DashBoardComponents/Box";
import { getAllUsersList } from "../../actions/admin/userActions";
import { listAllProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const DashboardScreen = () => {
	const dispatch = useDispatch();
	const { loading, products, error } = useSelector(
		(state) => state.adminAllProductList
	);
	const {
		loading: userLoading,
		data: userData,
		error: userError,
	} = useSelector((state) => state.adminUserAllUser);

	const {
		orders,
		loading: orderLoading,
		error: orderLoadingError,
	} = useSelector((state) => state.orderListAll);

	useEffect(() => {
		dispatch(getAllUsersList());
		dispatch(listAllProducts());
	}, [dispatch]);

	let userCount = userData ? userData.length : 0;
	let productCount = products ? products.length : 0;
	let orderCount = orders ? orders.length : 0;

	return (
		<div>
			{(loading || userLoading || orderLoading) && <Loader />}
			{(error || userError || orderLoadingError) && (
				<Message variant="danger">
					{error || userError || orderLoadingError}
				</Message>
			)}
			<Row>
				<Col md={4}>
					<Box key={1} header="Users" title="Users Count" count={userCount} />
				</Col>
				<Col md={4}>
					<Box
						key={2}
						header="Products"
						title="Products Count"
						count={productCount}
					/>
				</Col>
				<Col md={4}>
					<Box
						key={2}
						header="Orders"
						title="Orders Count"
						count={orderCount}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default DashboardScreen;
