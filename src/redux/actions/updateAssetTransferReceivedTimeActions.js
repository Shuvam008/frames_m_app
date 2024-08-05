import { createAction } from "@reduxjs/toolkit";

export const Member_updateAssetTransferReceivedTime = createAction(
  "Member/updateAssetTransferReceivedTime",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateAssetTransferReceivedTimeInit = createAction(
  "Member/Member_updateAssetTransferReceivedTimeInit"
);

export const Member_updateAssetTransferReceivedTimeResolved = createAction(
  "Member/updateAssetTransferReceivedTimeResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateAssetTransferReceivedTimeRejected = createAction(
  "Member/updateAssetTransferReceivedTimeRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetupdateAssetTransferReceivedTime = createAction(
  "Member/Member_resetupdateAssetTransferReceivedTime",
  function prepare(payload) {
    return { payload };
  }
);