import {
  Member_getLocationByIdInit,
  Member_getLocationByIdRejected,
  Member_getLocationByIdResolved,
} from '../actions/getLocationByIdActions';

import {createReducer} from '@reduxjs/toolkit';

const initialState = {data: {}, isInProgress: false, isError: false};

export const getLocationByIdReducer = createReducer(initialState, builder => {
  builder
    .addCase(Member_getLocationByIdInit, state => {
      return {...state, data: {}, isError: false, isInProgress: false};
    })
    .addCase(Member_getLocationByIdResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_getLocationByIdRejected, (state, action) => {
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
