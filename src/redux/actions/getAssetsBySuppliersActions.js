import {createAction} from '@reduxjs/toolkit';

export const Member_getAssetBySupplierFetch = createAction('Member/getAssetBySupplier');
export const Member_getAssetBySupplierInit = createAction(
  'Member/Member_getAssetBySupplierInit',
);
export const Member_getAssetBySupplierResolved = createAction(
  'Member/getAssetBySupplierResolved',
  function prepare(payload) {
    return {payload};
  },
);
export const Member_getAssetBySupplierRejected = createAction(
  'Member/getAssetBySupplierRejected',
  function prepare(payload) {
    return {payload};
  },
);
