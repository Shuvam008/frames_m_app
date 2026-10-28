import {
  Member_updateAssetTransferTime,
  Member_updateAssetTransferTimeResolved,
  Member_updateAssetTransferTimeRejected
} from "../actions/updateAssetTransferTimeActions";

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updateAssetTransferTime(action) {
  try {
    console.log(" fetchupdateAssetTransferTime action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/updateAsset_transfer/transferTime`;
    console.log(" fetchupdateAssetTransferTime url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "post";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchupdateAssetTransferTime data >>>", response.data);
    
    if (response.status >= 200 && response.status < 300) {
      yield put(Member_updateAssetTransferTimeResolved(response.data));
    } else {
      console.log(
        " Member_updateAssetTransferTimeResolved not called >>>",
        response.data
      );
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
  } catch (e) {
    yield put(Member_updateAssetTransferTimeRejected(e));
  }
}

function* fetchupdateAssetTransferTimeSaga() {
    yield takeLatest(Member_updateAssetTransferTime, updateAssetTransferTime)
}

export default fetchupdateAssetTransferTimeSaga;