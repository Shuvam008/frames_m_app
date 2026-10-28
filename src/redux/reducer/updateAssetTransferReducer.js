import {
  Member_updateAssetTransferInit,
  Member_updateAssetTransferRejected,
  Member_updateAssetTransferResolved,
  Member_updateAssetTransfer,
  Member_resetupdateAssetTransfer
  
} from "../actions/updateAssetTransferActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const updateAssetTransferReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_updateAssetTransferInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: true };
    })
    .addCase(Member_updateAssetTransfer, (state, action) => {
      console.log("Member_updateLocation_closeAsset_maintenance called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: true,
      };
    })
    .addCase(Member_updateAssetTransferResolved, (state, action) => {
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
    .addCase(Member_updateAssetTransferRejected, (state, action) => {
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
    .addCase(Member_resetupdateAssetTransfer, (state, action) => {
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
});
