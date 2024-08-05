import {
    Member_getAssetTransferListFetch,
    Member_getAssetTransferListResolved,
    Member_getAssetTransferListRejected
} from "../actions/getAssetTransferListAction";

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAsset_transfer(action) {
  try {
    console.log(" fetchAsset_Transfer action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/getAllAsset_transfers`;
    console.log(" fetchAsset_Transfer url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "get";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchAsset_Transfer data >>>", response.data);
    yield put(Member_getAssetTransferListResolved(response.data));
  } catch (e) {
    yield put(Member_getAssetTransferListRejected(e));
  }
}

function* fetchAsset_TransferSaga() {
    yield takeLatest(Member_getAssetTransferListFetch, fetchAsset_transfer)
}

export default fetchAsset_TransferSaga;