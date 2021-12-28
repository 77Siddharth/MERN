import React, { Fragment } from "react";
import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import {
  MdAccountBalance,
  MdLibraryAddCheck,
  MdLocalShipping,
} from "react-icons/md";
import "./CheckoutSteps.css";

function CheckoutSteps({ activeStep }) {
  const steps = [
    {
      lable: <Typography>Shipping Details</Typography>,
      icon: <MdLocalShipping />,
    },
    {
      lable: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAddCheck />,
    },
    {
      lable: <Typography>Make Payment</Typography>,
      icon: <MdAccountBalance />,
    },
  ];

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              icon={step.icon}
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)",
              }}
            >
              {step.lable}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
}

export default CheckoutSteps;
