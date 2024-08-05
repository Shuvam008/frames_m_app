import {createAction} from '@reduxjs/toolkit';

export const Member_getAssetByLocationFetch = createAction('Member/getAssetByLocation');
export const Member_getAssetByLocationInit = createAction(
  'Member/Member_getAssetByLocationInit',
);
export const Member_getAssetByLocationResolved = createAction(
  'Member/getAssetByLocationResolved',
  function prepare(payload) {
    return {payload};
  },
);
export const Member_getAssetByLocationRejected = createAction(
  'Member/getAssetByLocationRejected',
  function prepare(payload) {
    return {payload};
  },
);
