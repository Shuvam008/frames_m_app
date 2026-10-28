import { createAction } from "@reduxjs/toolkit";

export const Member_getAssetTypeFetch = createAction("Member/getAssetType");
export const Member_getAssetTypeInit = createAction(
  "Member/Member_getAssetTypeInit"
);
export const Member_getAssetTypeResolved = createAction(
  "Member/getAssetTypeResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_getAssetTypeRejected = createAction(
  "Member/getAssetTypeRejected",
  function prepare(payload) {
    return { payload };
  }
);