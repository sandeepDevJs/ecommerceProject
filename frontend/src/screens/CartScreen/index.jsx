import React from "react";
import { useSelector } from "react-redux";
import { CartContext } from "../../contexts/cartContext";
import CartScreen from "./CartScreen";

const Index = () => {
	const cartData = useSelector((state) => state.cartList);
	return (
		<CartContext.Provider value={cartData}>
			<CartScreen />
		</CartContext.Provider>
	);
};

export default Index;
