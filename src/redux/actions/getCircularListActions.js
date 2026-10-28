import { createAction } from '@reduxjs/toolkit';

export const Member_getCircularListFetch = createAction('Member/getCircularListFetch');
export const Member_getCircularListInit = createAction('Member/Member_getCircularListInit');
export const Member_getCircularListResolved = createAction('Member/getCircularListResolved', function prepare(payload) {
    return {payload}
});
export const Member_getCircularListRejected = createAction('Member/getCircularListRejected', function prepare(payload) {
  return {payload}
});

