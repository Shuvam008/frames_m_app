import {

  Member_resetupdateAssetTransferReceivedTime,
  Member_updateAssetTransferReceivedTime,
  Member_updateAssetTransferReceivedTimeInit,
  Member_updateAssetTransferReceivedTimeRejected,
  Member_updateAssetTransferReceivedTimeResolved
} from "../actions/updateAssetTransferReceivedTimeActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const updateAssetTransferReceivedTimeReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(Member_updateAssetTransferReceivedTimeInit, (state) => {
        return { ...state, data: {}, isError: false, isInProgress: true };
      })
      .addCase(Member_updateAssetTransferReceivedTime, (state, action) => {
        console.log("Member_updateLocation_closeAsset_maintenance called");
        return {
          ...state,
          data: action.payload,
          isError: false,
          isInProgress: true,
        };
      })
      .addCase(
        Member_updateAssetTransferReceivedTimeResolved,
        (state, action) => {
          console.log(
            "Form submitted successfully>>Member_updateLocation_closeAsset_maintenanceResolved called"
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
        Member_updateAssetTransferReceivedTimeRejected,
        (state, action) => {
          console.log(
            "Form submitted successfully>>Member_updateLocation_closeAsset_maintenanceRejected called"
          );
          return {
            ...state,
            data: action.payload,
            isError: true,
            isInProgress: false,
          };
        }
      )
      .addCase(Member_resetupdateAssetTransferReceivedTime, (state, action) => {
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
