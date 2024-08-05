import {
  Member_updateVendor_ackAsset_maintenanceInit,
  Member_updateVendor_ackAsset_maintenanceRejected,
  Member_updateVendor_ackAsset_maintenanceResolved,
  Member_updateVendor_ackAsset_maintenance,
  Member_resetUpdateVendor_ackAsset_maintenance,
} from "../actions/updateVendor_ackAsset_maintenanceActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const updateVendor_ackAsset_maintenanceReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(Member_updateVendor_ackAsset_maintenanceInit, (state) => {
        return { ...state, data: {}, isError: false, isInProgress: true };
      })
      .addCase(Member_updateVendor_ackAsset_maintenance, (state, action) => {
        console.log("Member_updateVendor_ackAsset_maintenance called");
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: true,
        };
      })
      .addCase(
        Member_updateVendor_ackAsset_maintenanceResolved,
        (state, action) => {
          console.log(
            "Form submitted successfully>>Member_updateVendor_ackAsset_maintenanceResolved called"
          );
          return {
            ...state,
            data: action.payload,
            isError: false,
            isInProgress: false,
          };
        }
      )
      .addCase(
        Member_updateVendor_ackAsset_maintenanceRejected,
        (state, action) => {
          console.log(
            "Form submitted successfully>>Member_updateVendor_ackAsset_maintenanceRejected called"
          );
          return {
            ...state,
            data: action.payload,
            isError: true,
            isInProgress: false,
          };
        }
      )
      .addCase(
        Member_resetUpdateVendor_ackAsset_maintenance,
        (state, action) => {
          console.log("Form submitted successfully>>Member_resetAsset called");
          return {
            ...state,
            data: action.payload,
            isError: false,
            isInProgress: false,
          };
        }
      )
      .addDefaultCase((state) => {
        return state;
      });
  }
);
