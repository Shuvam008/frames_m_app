import {
  // Member_updateLocation_closeAsset_maintenance,
  // Member_updateLocation_closeAsset_maintenanceRejected,
  // Member_updateLocation_closeAsset_maintenanceResolved,
  Member_updateAssetTransferReceivedTime,
  Member_updateAssetTransferReceivedTimeResolved,
  Member_updateAssetTransferReceivedTimeRejected,
} from "../actions/updateAssetTransferReceivedTimeActions";

import { call, put, takeLatest } from 'redux-saga/effects'

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updateAssetTransferReceivedTime(action) {
  try {
    console.log(" fetchupdateAssetTransferReceivedTime action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/updateAsset_transfer/receivedtransferTime`;
    console.log(" fetchupdateAssetTransferReceivedTime url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "patch";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchupdateAssetTransferReceivedTime data >>>", response.data);
    
    if (response.status >= 200 && response.status < 300) {
      yield put(Member_updateAssetTransferReceivedTimeResolved(response.data));
    } else {
      console.log(
        " Member_updateAssetTransferReceivedTimeResolved not called >>>",
        response.data
      );
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
  } catch (e) {
    yield put(Member_updateAssetTransferReceivedTimeRejected(e));
  }
}

function* fetchupdateAssetTransferReceivedTimeSaga() {
    yield takeLatest(Member_updateAssetTransferReceivedTime, updateAssetTransferReceivedTime)
}

export default fetchupdateAssetTransferReceivedTimeSaga;