import { createAction } from "@reduxjs/toolkit";

export const Member_save_updateSupplier = createAction(
  "Member/save_updateSupplier",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_save_updateSupplierInit = createAction("Member/Member_save_updateSupplierInit");

export const Member_save_updateSupplierResolved = createAction(
  "Member/save_updateSupplierResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_save_updateSupplierRejected = createAction(
  "Member/save_updateSupplierRejected",
  function prepare(payload) {
    return { payload };
  }
);

export const Member_resetSave_updateSupplier = createAction(
  "Member/Member_resetAsset",
  function prepare(payload) {
    return { payload };
  }
);
