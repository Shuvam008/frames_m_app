import {
  Member_subAssetListInit,
  Member_subAssetListRejected,
  Member_subAssetListResolved,
} from "../actions/subAssetsAction";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const subAssetListReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_subAssetListInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: false };
    })
    .addCase(Member_subAssetListResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_subAssetListRejected, (state, action) => {
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
