import { createAction } from "@reduxjs/toolkit";

export const Member_saveSubAsset = createAction(
  "Member/saveSubAsset",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_saveSubAssetInit = createAction("Member/Member_saveSubAssetInit");

export const Member_saveSubAssetResolved = createAction(
  "Member/saveSubAssetResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_saveSubAssetRejected = createAction(
  "Member/saveSubAssetRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetSubAsset = createAction(
  "Member/Member_resetAsset",
  function prepare(payload) {
    return { payload };
  }
);
