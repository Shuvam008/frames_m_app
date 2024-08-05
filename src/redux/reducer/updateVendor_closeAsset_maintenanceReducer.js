import {
  Member_updateVendor_closeAsset_maintenanceInit,
  Member_updateVendor_closeAsset_maintenanceRejected,
  Member_updateVendor_closeAsset_maintenanceResolved,
  Member_updateVendor_closeAsset_maintenance,
  Member_resetupdateVendor_closeAsset_maintenance,
} from "../actions/updateVendor_closeAsset_maintenanceActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const updateVendor_closeAsset_maintenanceReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(Member_updateVendor_closeAsset_maintenanceInit, (state) => {
        return { ...state, data: {}, isError: false, isInProgress: true };
      })
      .addCase(Member_updateVendor_closeAsset_maintenance, (state, action) => {
        console.log("updateVendor_closeAsset_maintenance called");
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: true,
        };
      })
      .addCase(
        Member_updateVendor_closeAsset_maintenanceResolved,
        (state, action) => {
          console.log(
            "Form submitted successfully>>updateVendor_closeAsset_maintenanceResolved called"
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
        Member_updateVendor_closeAsset_maintenanceRejected,
        (state, action) => {
          console.log(
            "Form submitted successfully>>updateVendor_closeAsset_maintenanceRejected called"
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
        Member_resetupdateVendor_closeAsset_maintenance,
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
