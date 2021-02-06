import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const getIcon = (iconName) => {
	switch (iconName) {
		case "Users":
			return <i style={{ fontSize: "40px" }} className="fas fa-users"></i>;

		case "Products":
			return <i style={{ fontSize: "40px" }} className="fas fa-tags"></i>;

		case "Orders":
			return <i style={{ fontSize: "40px" }} className="fas fa-clipboard"></i>;

		default:
			break;
	}
};

const Box = ({ key, header, title, count }) => {
	return (
		<div>
			<Card
				bg={"dark"}
				key={key}
				text={"light"}
				style={{ width: "18rem" }}
				className="mb-2"
			>
				<Card.Header>{header}</Card.Header>
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>
						<Row>
							<Col md={6} style={{ fontSize: "35px" }}>
								{count}
							</Col>
							<Col style={{ float: "right" }} md={6}>
								{getIcon(header)}
							</Col>
						</Row>
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<Link style={{ color: "white" }} to={`/admin/${header}/`}>
						Viwe Details <i className="fas fa-angle-double-right"></i>
					</Link>
				</Card.Footer>
			</Card>
		</div>
	);
};

export default Box;
