import { createAction } from "@reduxjs/toolkit";

export const Member_updateVendor_closeAsset_maintenance = createAction(
  "Member/updateVendor_closeAsset_maintenance",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateVendor_closeAsset_maintenanceInit = createAction(
  "Member/Member_updateVendor_closeAsset_maintenanceInit"
);

export const Member_updateVendor_closeAsset_maintenanceResolved = createAction(
  "Member/updateVendor_closeAsset_maintenanceResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateVendor_closeAsset_maintenanceRejected = createAction(
  "Member/updateVendor_closeAsset_maintenanceRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetupdateVendor_closeAsset_maintenance = createAction(
  "Member/Member_resetupdateVendor_closeAsset_maintenance",
  function prepare(payload) {
    return { payload };
  }
);
