import { createAction } from "@reduxjs/toolkit";

export const Member_save_updateLocation = createAction(
  "Member/save_updateLocation",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_save_updateLocationInit = createAction("Member/Member_save_updateLocationInit");

export const Member_save_updateLocationResolved = createAction(
  "Member/save_updateLocationResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_save_updateLocationRejected = createAction(
  "Member/save_updateLocationRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetSave_updateLocation = createAction(
  "Member/Member_resetAsset",
  function prepare(payload) {
    return { payload };
  }
);
