import { createAction } from '@reduxjs/toolkit';

export const Member_getUserListFetch = createAction('Member/getUserList');
export const Member_getUserListInit = createAction('Member/Member_getUserListInit');
export const Member_getUserListResolved = createAction('Member/getUserListResolved', function prepare(payload) {
    return {payload}
});
export const Member_getUserListRejected = createAction('Member/getUserListRejected', function prepare(payload) {
  return {payload}
});

