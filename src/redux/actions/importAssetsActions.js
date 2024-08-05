import { createAction } from "@reduxjs/toolkit";

export const Member_importAssets = createAction(
  "Member/importAssets",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_importAssetsInit = createAction("Member/Member_importAssetsInit");

export const Member_importAssetsResolved = createAction(
  "Member/importAssetsResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_importAssetsRejected = createAction(
  "Member/importAssetsRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetImportAssets = createAction(
  "Member/Member_resetImportAssets",
  function prepare(payload) {
    return { payload };
  }
);
