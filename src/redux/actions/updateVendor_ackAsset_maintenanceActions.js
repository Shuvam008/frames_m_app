import { createAction } from "@reduxjs/toolkit";

export const Member_updateVendor_ackAsset_maintenance = createAction(
  "Member/updateVendor_ackAsset_maintenance",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateVendor_ackAsset_maintenanceInit = createAction(
  "Member/Member_updateVendor_ackAsset_maintenanceInit"
);

export const Member_updateVendor_ackAsset_maintenanceResolved = createAction(
  "Member/updateVendor_ackAsset_maintenanceResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateVendor_ackAsset_maintenanceRejected = createAction(
  "Member/updateVendor_ackAsset_maintenanceRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetUpdateVendor_ackAsset_maintenance = createAction(
  "Member/Member_resetUpdateVendor_ackAsset_maintenance",
  function prepare(payload) {
    return { payload };
  }
);
