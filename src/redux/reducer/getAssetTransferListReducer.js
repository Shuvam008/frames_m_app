import {
  Member_getAssetTransferListInit,
  Member_getAssetTransferListRejected,
  Member_getAssetTransferListResolved,
} from "../actions/getAssetTransferListAction";

import { createReducer } from '@reduxjs/toolkit';

const initialState = { data: {},isInProgress: false,isError:false };

export const getAssetTransferListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_getAssetTransferListInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: false };
    })
    .addCase(Member_getAssetTransferListResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_getAssetTransferListRejected, (state, action) => {
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