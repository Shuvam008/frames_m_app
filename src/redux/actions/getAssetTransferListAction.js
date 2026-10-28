import { createAction } from '@reduxjs/toolkit';

export const Member_getAssetTransferListFetch = createAction('Member/getAssetTransferList');
export const Member_getAssetTransferListInit = createAction('Member/Member_getAssetTransferListInit');
export const Member_getAssetTransferListResolved = createAction('Member/getAssetTransferListResolved', function prepare(payload) {
    return {payload}
});
export const Member_getAssetTransferListRejected = createAction('Member/getAssetTransferListRejected', function prepare(payload) {
  return {payload}
});

