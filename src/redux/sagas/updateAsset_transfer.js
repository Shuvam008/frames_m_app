import {
  Member_updateAssetTransfer,
  Member_updateAssetTransferResolved,
  Member_updateAssetTransferRejected
} from "../actions/updateAssetTransferActions";

import { call, put, takeLatest } from 'redux-saga/effects'
import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* updateAssetTransfer(action) {
  try {
    console.log(" fetchupdateLocation_closeAsset_maintenance action >>>", action);
    const url = `${process.env.REACT_APP_EAPIURL}/update_transfer`;
    console.log(" fetchupdateLocation_closeAsset_maintenance url >>>", url);
    // const url = "http://192.168.1.2:8086/api/assets";
    const method = "patch";
    const response = yield call(http, url, method, action.payload);
    console.log(" fetchupdateLocation_closeAsset_maintenance data >>>", response.data);
    
    if (response.status >= 200 && response.status < 300) {
      yield put(Member_updateAssetTransferResolved(response.data));
    } else {
      console.log(
        " Member_updateLocation_closeAsset_maintenanceResolved not called >>>",
        response.data
      );
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
  } catch (e) {
    yield put(Member_updateAssetTransferRejected(e));
  }
}

function* fetchupdateAssetTransferSaga() {
  yield takeLatest(Member_updateAssetTransfer, updateAssetTransfer);
}

export default fetchupdateAssetTransferSaga;