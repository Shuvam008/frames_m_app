import { createAction } from "@reduxjs/toolkit";

export const Member_updateAssetTransferTime = createAction(
  "Member/updateAssetTransferTime",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateAssetTransferTimeInit = createAction(
  "Member/Member_updateAssetTransferTimeInit"
);

export const Member_updateAssetTransferTimeResolved = createAction(
  "Member/updateAssetTransferTimeResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateAssetTransferTimeRejected = createAction(
  "Member/updateAssetTransferTimeRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetupdateAssetTransferTime = createAction(
  "Member/Member_resetupdateAssetTransferTime",
  function prepare(payload) {
    return { payload };
  }
);