import { createAction } from "@reduxjs/toolkit";

export const Member_updateLocation_closeAsset_maintenance = createAction(
  "Member/updateLocation_closeAsset_maintenance",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateLocation_closeAsset_maintenanceInit = createAction(
  "Member/Member_updateLocation_closeAsset_maintenanceInit"
);

export const Member_updateLocation_closeAsset_maintenanceResolved = createAction(
  "Member/updateLocation_closeAsset_maintenanceResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_updateLocation_closeAsset_maintenanceRejected = createAction(
  "Member/updateLocation_closeAsset_maintenanceRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetupdateLocation_closeAsset_maintenance = createAction(
  "Member/Member_resetupdateLocation_closeAsset_maintenance",
  function prepare(payload) {
    return { payload };
  }
);