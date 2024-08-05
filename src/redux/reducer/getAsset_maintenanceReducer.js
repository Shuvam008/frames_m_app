import {
  Member_Asset_maintenanceInit, 
  Member_Asset_maintenanceRejected,
  Member_Asset_maintenanceResolved
} from "../actions/getAsset_maintenanceActions";

import { createReducer } from '@reduxjs/toolkit';

const initialState = { data: {},isInProgress: false,isError:false };

export const getAsset_maintenanceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_Asset_maintenanceInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: false };
    })
    .addCase(Member_Asset_maintenanceResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_Asset_maintenanceRejected, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addDefaultCase((state) => {
      state;
    });
});