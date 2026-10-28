import {
  Member_subAssetTypeInit,
  Member_subAssetTypeRejected,
  Member_subAssetTypeResolved,
} from "../actions/subAssetsTypeActions";

import { createReducer } from "@reduxjs/toolkit";

const initialState = { data: {}, isInProgress: false, isError: false };

export const subAssetTypeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(Member_subAssetTypeInit, (state) => {
      return { ...state, data: {}, isError: false, isInProgress: false };
    })
    .addCase(Member_subAssetTypeResolved, (state, action) => {
      return {
        ...state,
        data: action.payload,
        isError: false,
        isInProgress: false,
      };
    })
    .addCase(Member_subAssetTypeRejected, (state, action) => {
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
