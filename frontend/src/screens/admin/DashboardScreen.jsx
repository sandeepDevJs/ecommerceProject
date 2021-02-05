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

	useEffect(() => {
		dispatch(getAllUsersList());
		dispatch(listAllProducts());
	}, [dispatch]);

	let userCount = userData ? userData.length : 0;
	let productCount = products ? products.length : 0;

	return (
		<div>
			{(loading || userLoading) && <Loader />}
			{(error || userError) && (
				<Message variant="danger">{error || userError}</Message>
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
					<Box key={2} header="Orders" title="Orders Count" count="1" />
				</Col>
			</Row>
		</div>
	);
};

export default DashboardScreen;
