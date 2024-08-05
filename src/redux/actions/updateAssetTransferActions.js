import { createAction } from "@reduxjs/toolkit";

export const Member_updateAssetTransfer = createAction(
  "Member/updateAssetTransfer",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateAssetTransferInit = createAction(
  "Member/Member_updateAssetTransferInit"
);

export const Member_updateAssetTransferResolved = createAction(
  "Member/updateAssetTransferResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateAssetTransferRejected = createAction(
  "Member/updateAssetTransferRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetupdateAssetTransfer = createAction(
  "Member/Member_resetupdateAssetTransfer",
  function prepare(payload) {
    return { payload };
  }
);