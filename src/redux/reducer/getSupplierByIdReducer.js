import {
  Member_getSupplierByIdInit,
  Member_getSupplierByIdRejected,
  Member_getSupplierByIdResolved,
} from '../actions/getSupplierByIdActions';

import {createReducer} from '@reduxjs/toolkit';

const initialState = {data: {}, isInProgress: false, isError: false};

export const getSupplierByIdReducer = createReducer(initialState, builder => {
  builder
    .addCase(Member_getSupplierByIdInit, state => {
      return {...state, data: {}, isError: false, isInProgress: false};
    })
    .addCase(Member_getSupplierByIdResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_getSupplierByIdRejected, (state, action) => {
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
