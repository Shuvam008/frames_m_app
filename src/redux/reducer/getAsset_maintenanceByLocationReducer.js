import {
  Member_Asset_maintenanceBylocationFetch,
  Member_Asset_maintenanceBylocationInit,
  Member_Asset_maintenanceBylocationRejected,
  Member_Asset_maintenanceBylocationResolved,
} from '../actions/getAsset_maintenanceBylocationActions';

import { createReducer } from '@reduxjs/toolkit';

const initialState = { data: {},isInProgress: false,isError:false };

export const getAsset_maintenanceBylocationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_Asset_maintenanceBylocationInit, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_Asset_maintenanceBylocationFetch, state => {
      return {...state, data: {}, isError: false, isInProgress: true};
    })
    .addCase(Member_Asset_maintenanceBylocationResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_Asset_maintenanceBylocationRejected, (state, action) => {
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