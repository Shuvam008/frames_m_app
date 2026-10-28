import {
  Member_createAssetTransfer,
  Member_createAssetTransferResolved,
  Member_createAssetTransferRejected
} from "../actions/createAssetTransferAction";

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* createAsset_transfer(action) {
  try {
    console.log(" fetchcreateAsset_transfer action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/createAsset_transfer`;
    console.log(" fetchcreateAsset_transfer url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "post";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchcreateAsset_transfer data >>>", response.data);
    yield put(Member_createAssetTransferResolved(response.data));
  } catch (e) {
    yield put(Member_createAssetTransferRejected(e));
  }
}

function* fetchcreateAsset_transferSaga() {
    yield takeLatest(Member_createAssetTransfer, createAsset_transfer)
}

export default fetchcreateAsset_transferSaga;