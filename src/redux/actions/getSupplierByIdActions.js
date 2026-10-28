import {createAction} from '@reduxjs/toolkit';

export const Member_getSupplierByIdFetch = createAction('Member/getSupplierById');
export const Member_getSupplierByIdInit = createAction(
  'Member/Member_getSupplierByIdInit',
);
export const Member_getSupplierByIdResolved = createAction(
  'Member/getSupplierByIdResolved',
  function prepare(payload) {
    return {payload};
  },
);
export const Member_getSupplierByIdRejected = createAction(
  'Member/getSupplierByIdRejected',
  function prepare(payload) {
    return {payload};
  },
);
