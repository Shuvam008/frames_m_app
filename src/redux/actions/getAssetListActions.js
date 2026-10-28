import { createAction } from '@reduxjs/toolkit';

export const Member_getAssetListFetch = createAction('Member/getAssetList');
export const Member_getAssetListInit = createAction('Member/Member_getAssetListInit');
export const Member_getAssetListResolved = createAction('Member/getAssetListResolved', function prepare(payload) {
    return {payload}
});
export const Member_getAssetListRejected = createAction('Member/getAssetListRejected', function prepare(payload) {
  return {payload}
});

