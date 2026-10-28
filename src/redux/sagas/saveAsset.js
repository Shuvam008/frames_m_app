import {
  Member_saveAsset,
  Member_saveAssetRejected,
  Member_saveAssetResolved,
} from "../actions/saveAssetAction";
import { call, put, takeLatest } from "redux-saga/effects";

import http from '../../API/http';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSaveAsset(action) {
  try {
    console.log(" fetchSuppliers action >>>", action);
    // const url=`${process.env.EAPI_URL}/api/assets`;
    const url = `${process.env.REACT_APP_EAPIURL}/addAsset`;
    // const url = "http://192.168.1.17:8086/api/addAsset";
    const method = "POST";
    console.log(" fetchSaveAsset data >>>", action.payload);

    const response = yield call(http, url, method, action.payload);
    console.log(" fetchSaveAsset data >>>", response);

    if (response.status >= 200 && response.status < 300) {
      console.log(" Member_saveAssetResolved called >>>", response.data);
      yield put(Member_saveAssetResolved(response.data));
    } else {
      console.log(" Member_saveAssetResolved not called >>>", response.data);
      throw new Error(`HTTP request failed with status ${response.status}`);
      
    }
    
  } catch (e) {
    yield put(Member_saveAssetRejected(e));
  }
}

function* fetchSaveAssetSaga() {
  yield takeLatest(Member_saveAsset, fetchSaveAsset);
}

export default fetchSaveAssetSaga;
