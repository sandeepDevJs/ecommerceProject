import React from "react";
import { Helmet } from "react-helmet";

const MetaContainer = ({ title, desc, keys }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={desc} />
			<meta name="keywords" content={keys} />
		</Helmet>
	);
};

MetaContainer.defaultProps = {
	title: "CartIt",
	keys: "Electronics, Camera, Phones, Computers, Mouse",
	desc: "One Place For All Kinds Of Electronic Products",
};

export default MetaContainer;
