import {createAction} from '@reduxjs/toolkit';

export const Member_Asset_maintenanceBylocationFetch = createAction(
  'Member/Asset_maintenanceBylocation',
);
export const Member_Asset_maintenanceBylocationInit = createAction(
  'Member/Member_Asset_maintenanceBylocationInit',
);
export const Member_Asset_maintenanceBylocationResolved = createAction(
  'Member/Asset_maintenanceBylocationResolved',
  function prepare(payload) {
    return {payload};
  },
);
export const Member_Asset_maintenanceBylocationRejected = createAction(
  'Member/Asset_maintenanceBylocationRejected',
  function prepare(payload) {
    return {payload};
  },
);
