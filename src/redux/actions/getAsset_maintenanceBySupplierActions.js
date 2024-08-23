import {createAction} from '@reduxjs/toolkit';

export const Member_Asset_maintenanceBySupplierFetch = createAction(
  'Member/Asset_maintenanceBySupplier',
);
export const Member_Asset_maintenanceBySupplierInit = createAction(
  'Member/Member_Asset_maintenanceBySupplierInit',
);
export const Member_Asset_maintenanceBySupplierResolved = createAction(
  'Member/Asset_maintenanceBySupplierResolved',
  function prepare(payload) {
    return {payload};
  },
);
export const Member_Asset_maintenanceBySupplierRejected = createAction(
  'Member/Asset_maintenanceBySupplierRejected',
  function prepare(payload) {
    return {payload};
  },
);
