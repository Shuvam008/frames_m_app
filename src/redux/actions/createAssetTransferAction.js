import { createAction } from "@reduxjs/toolkit";

export const Member_createAssetTransfer = createAction(
  "Member/createAssetTransfer",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_createAssetTransferInit = createAction("Member/Member_createAssetTransferInit");

export const Member_createAssetTransferResolved = createAction(
  "Member/createAssetTransferResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_createAssetTransferRejected = createAction(
  "Member/createAssetTransferRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetCreateAssetTransfer = createAction(
  "Member/Member_resetCreateAssetTransfer",
  function prepare(payload) {
    return { payload };
  }
);
