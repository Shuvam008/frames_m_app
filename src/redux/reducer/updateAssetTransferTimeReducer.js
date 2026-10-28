import {
  Member_resetupdateAssetTransferTime,
  Member_updateAssetTransferTime,
  Member_updateAssetTransferTimeInit,
  Member_updateAssetTransferTimeRejected,
  Member_updateAssetTransferTimeResolved
} from "../actions/updateAssetTransferTimeActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const updateAssetTransferTimeReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(Member_updateAssetTransferTimeInit, (state) => {
        return { ...state, data: {}, isError: false, isInProgress: true };
      })
      .addCase(Member_updateAssetTransferTime, (state, action) => {
        console.log("Member_updateLocation_closeAsset_maintenance called");
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: true,
        };
      })
      .addCase(Member_updateAssetTransferTimeResolved, (state, action) => {
        console.log(
          "Form submitted successfully>>Member_updateLocation_closeAsset_maintenanceResolved called"
        );
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: false,
        };
      })
      .addCase(Member_updateAssetTransferTimeRejected, (state, action) => {
        console.log(
          "Form submitted successfully>>Member_updateLocation_closeAsset_maintenanceRejected called"
        );
        return {
          ...state,
          data: action.payload,
          isError: true,
          isInProgress: false,
        };
      })
      .addCase(Member_resetupdateAssetTransferTime, (state, action) => {
        console.log("Form submitted successfully>>Member_resetAsset called");
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: false,
        };
      })
      .addDefaultCase((state) => {
        return state;
      });
  }
);
