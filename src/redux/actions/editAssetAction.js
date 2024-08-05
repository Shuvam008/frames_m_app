import { createAction } from "@reduxjs/toolkit";

export const Member_editAsset = createAction(
  "Member/editAsset",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_editAssetInit = createAction(
  "Member/Member_editAssetInit"
);
export const Member_editAssetResolved = createAction(
  "Member/editAssetResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_editAssetRejected = createAction(
  "Member/editAssetRejected",
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

