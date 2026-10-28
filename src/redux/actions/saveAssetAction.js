import { createAction } from "@reduxjs/toolkit";

export const Member_saveAsset = createAction(
  "Member/saveAsset",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_saveAssetInit = createAction("Member/Member_saveAssetInit");

export const Member_saveAssetResolved = createAction(
  "Member/saveAssetResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_saveAssetRejected = createAction(
  "Member/saveAssetRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetAsset = createAction(
  "Member/Member_resetAsset",
  function prepare(payload) {
    return { payload };
  }
);
