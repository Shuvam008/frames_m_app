import {
  Member_createAssetTransferInit,
  Member_createAssetTransferRejected,
  Member_createAssetTransferResolved,
  Member_createAssetTransfer,
  Member_resetCreateAssetTransfer
} from "../actions/createAssetTransferAction";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const createAsset_transferReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_createAssetTransferInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: true };
    })
    .addCase(Member_createAssetTransfer, (state, action) => {
      console.log("Member_createAsset_maintenance called");
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: true,
      };
    })
    .addCase(Member_createAssetTransferResolved, (state, action) => {
      console.log(
        "Form submitted successfully>>Member_createAsset_maintenanceResolved called"
      );
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_createAssetTransferRejected, (state, action) => {
      console.log(
        "Form submitted successfully>>Member_createAsset_maintenanceRejected called"
      );
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addCase(Member_resetCreateAssetTransfer, (state, action) => {
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
