import { createAction } from "@reduxjs/toolkit";

export const Member_createAsset_maintenance = createAction(
  "Member/createAsset_maintenance",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_createAsset_maintenanceInit = createAction("Member/Member_createAsset_maintenanceInit");

export const Member_createAsset_maintenanceResolved = createAction(
  "Member/createAsset_maintenanceResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_createAsset_maintenanceRejected = createAction(
  "Member/createAsset_maintenanceRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetAsset_maintenance = createAction(
  "Member/Member_resetAsset_maintenance",
  function prepare(payload) {
    return { payload };
  }
);
