import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

 /**
   * The checkout progress steps.
   *
   * @type {Array<string>}
   */
const steps = ["Shipping", "Confirm Order", "Payment"];

 /**
   * Renders a checkout progress step.
   *
   * @param {string} label The label of the checkout progress step.
   * @param {number} index The index of the checkout progress step.
   *
   * @returns {React.Component} A React component that renders a checkout progress step.
   */
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1976d2",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1976d2",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

/**
 * A React component that displays the checkout progress steps.
 *
 * @param {object} props The component props.
 * @param {number} props.state The current state of the checkout process.
 *
 * @returns {React.Component} A React component that displays the checkout progress steps.
 */

export default function CheckoutSteps({ state }) {
  return (
    <div className="checkout-progress d-flex justify-content-center mt-5">
      <Box sx={{ width: "50%" }}>
        <Stepper activeStep={state} connector={<QontoConnector />}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={index} {...stepProps}>
                <StepLabel {...labelProps}>
                  <h6
                    style={{
                      color: index < state && "#1976d2",
                      marginBottom: "0px",
                      fontWeight: index < state && "bold",
                    }}
                  >
                    {label}
                  </h6>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </div>
  );
}
