import React from "react";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";

const CheckOutStep = ({ activeStep }) => {
	return (
		<div className="justify-content-center mb-4">
			<Stepper activeStep={activeStep}>
				<Step>
					<StepLabel>Shipping</StepLabel>
				</Step>
				<Step>
					<StepLabel>Payment</StepLabel>
				</Step>
				<Step>
					<StepLabel>Place Order</StepLabel>
				</Step>
			</Stepper>
		</div>
	);
};

CheckOutStep.defaultProps = {
	activeStep: 0,
};

export default CheckOutStep;
