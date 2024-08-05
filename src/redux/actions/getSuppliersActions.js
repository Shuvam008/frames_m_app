import { createAction } from "@reduxjs/toolkit";

export const Member_getSuppliersFetch = createAction("Member/getSuppliers");
export const Member_getSuppliersInit = createAction(
  "Member/Member_getSuppliersInit"
);
export const Member_getSuppliersResolved = createAction(
  "Member/getSuppliersResolved",
  function prepare(payload) {
    return { payload };
  }
);
export const Member_getSuppliersRejected = createAction(
  "Member/getSuppliersRejected",
  function prepare(payload) {
    return { payload };
  }
);
