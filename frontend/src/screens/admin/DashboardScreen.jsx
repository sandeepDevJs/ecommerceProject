import React from "react";
import { Row, Col } from "react-bootstrap";
import Box from "../../components/DashBoardComponents/Box";

const DashboardScreen = () => {
	return (
		<div>
			<Row>
				<Col md={4}>
					<Box
						key={1}
						header="Users"
						title="Users Count"
						count="1"
						iconName="users"
					/>
				</Col>
				<Col md={4}>
					<Box
						key={2}
						header="Products"
						title="Products Count"
						count="1"
						iconName="users"
					/>
				</Col>
				<Col md={4}>
					<Box
						key={2}
						header="Orders"
						title="Orders Count"
						count="1"
						iconName="users"
					/>
				</Col>
			</Row>
		</div>
	);
};

export default DashboardScreen;
