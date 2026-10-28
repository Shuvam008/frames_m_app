import {createAction} from '@reduxjs/toolkit';

export const Member_getLocationByIdFetch = createAction('Member/getLocationById');
export const Member_getLocationByIdInit = createAction(
  'Member/Member_getLocationByIdInit',
);
export const Member_getLocationByIdResolved = createAction(
  'Member/getLocationByIdResolved',
  function prepare(payload) {
    return {payload};
  },
);
export const Member_getLocationByIdRejected = createAction(
  'Member/getLocationByIdRejected',
  function prepare(payload) {
    return {payload};
  },
);
