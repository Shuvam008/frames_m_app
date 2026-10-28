import {
  Member_getCircularListFetch,
  Member_getCircularListInit,
  Member_getCircularListRejected,
  Member_getCircularListResolved,
} from '../actions/getCircularListActions';

import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  data: {},
  isInProgress: false,
  isError: false,
  errorMessage: null,
};

export const getCircularListReducer = createReducer(initialState, builder => {
  builder
    .addCase(Member_getCircularListInit, state => {
      return {
        ...state,
        data: {},
        isError: false,
        isInProgress: false,
        errorMessage: null,
      };
    })
    .addCase(Member_getCircularListFetch, state => {
      return {
        ...state,
        data: {},
        isError: false,
        isInProgress: true,
        errorMessage: null,
      };
    })
    .addCase(Member_getCircularListResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
        errorMessage: null,
      };
    })
    .addCase(Member_getCircularListRejected, (state, action) => {
      // Store only the serializable parts of the error (like message) in the state
      return {
        ...state,
        data: {}, // or keep the old data if necessary
        isError: true,
        isInProgress: false,
        errorMessage: action.error?.message || 'An error occurred', // Capture the error message
      };
    })
    .addDefaultCase(state => {
      return state;
    });
});
