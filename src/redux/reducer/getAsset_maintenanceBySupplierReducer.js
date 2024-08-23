import {
  Member_Asset_maintenanceBySupplierFetch,
  Member_Asset_maintenanceBySupplierInit,
  Member_Asset_maintenanceBySupplierRejected,
  Member_Asset_maintenanceBySupplierResolved,
} from '../actions/getAsset_maintenanceBySupplierActions';

import { createReducer } from '@reduxjs/toolkit';

const initialState = { data: {},isInProgress: false,isError:false };

export const getAsset_maintenanceBySupplierReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_Asset_maintenanceBySupplierInit, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_Asset_maintenanceBySupplierFetch, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_Asset_maintenanceBySupplierResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_Asset_maintenanceBySupplierRejected, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: true,
        isInProgress: false,
      };
    })
    .addDefaultCase(state => {
      state;
    });
});